
'use strict';


// external modules.
const md5                 = require('md5');
const async               = require('async');
const jwt                 = require('jsonwebtoken');
const path                = require('path');
const fs                  = require('fs');
const _                   = require('underscore');
const Joi                 = require('joi');
const timezoner           = require('timezoner');
const moment              = require('moment');
// internal modules.
const Models              = require('../Models');
const Utils               = require('./mailer');
const transporter         = Utils.transporter;
const messages            = require('./responses');
const Configs             = require('../Configs');
const env                 = require('../env');
const logger              = require('./logger');
const saltRounds          = 10;
const Responses           = require('./responses');
const STATUS_MSG          = Responses.STATUS_MSG.SUCCESS // Configs.app.STATUS_MSG;


module.exports = {

    failActionFunction: function(request, reply, source, error) {
        var customErrorMessage = '';
        if (error.output.payload.message.indexOf("[") > -1) {
            customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
        } else {
            customErrorMessage = error.output.payload.message;
        }
        customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        error.output.payload.message = customErrorMessage;
        delete error.output.payload.validation
        return reply(error);
    },
    check_contact_exist: function (request, callback) { //check if email exist in db ??
        Models.users.find({phone: request, is_deleted: false}, function (err, res) {
            callback(err, res);
        });
    },
    check_email_exist: function (request, callback) { //check if email exist in db ??
        Models.users.find({email: request, is_deleted:false}, function (err, res) {
            callback(err, res);
        });
    },
    check_confirmAccount_token: function (request, callback) { //check if given email verify token exist in db ??
	    console.log('\n\n', request);
	    Models.users.find({confirmAccount_token: request}, function (err, res) {
	        console.log('\n\n', err, res);
	        callback(err, res);
	    });
    },
    check_resetpassword_token_exist: function (request, callback) {
        Models.users.find({resetpassword_token: request}, function (err, res) {
            callback(err, res);
        });
    },
    check_old_password1: function (request, callback) {
        Models.users.User.findOne({$and: [{password: request.password}, {_id: request.user_id}]}, function (err, res) {
            callback(err, res);
        });
    },
    encryptpassword: function (request) { // password encryption.

        return md5(request);
    },
  
    require_login: function (request, reply) { // validate the given token

        var token = (request.payload != null && (request.payload.logintoken)) ? request.payload.logintoken : ((request.params && request.params.logintoken) ? request.params.logintoken : request.headers['x-logintoken']);
        async.waterfall([
            function (cb) {
                jwt.verify(token, Configs.CONSTS.jwtkey, function (err, decode) { // checking token expiry
                    if (err) {
                        cb(messages.tokenExpired)
                    } else {
                        cb(null, decode);
                    }
                })
            },
            function (decodedata, cb) {
                Models.users.findOne({login_token: token}, function (err, res) { // verifying token and respective userid existence in db
                    if (err) {
                        cb(messages.systemError)
                    } else {
                        if (!res) {
                            cb(messages.tokenExpired);
                        } else {
                            cb(null, {data: res})
                        }
                    }
                })
            }

        ], function (err, result) {
            if (err) {
                reply(err).takeover();
            } else {
                reply(result);
            }

        })
    },
   
    capitalizeFirstLetter: function(string) { // capitalize the first letter of the strings

        var firstname;
        var secondname;
        var name = string.split(' ')

        if (name.length > 1) { // first name and second name both
            var username = "";
            for (var i = 0; i < name.length; i++) {
                //console.log('name',name[0])
                firstname = name[i].charAt(0).toUpperCase() + name[i].slice(1);
                if (i != 0) {
                    username = username + ' ' + firstname;
                } else {
                    username = firstname;
                }
            }
            return username
        } else if (name.length == 1) { // only first name
            firstname = name[0].charAt(0).toUpperCase() + name[0].slice(1);
            username = firstname;
            return username
        }
    }
};



function jsonParseStringify(data) {
    return JSON.parse(JSON.stringify(data));
}

module.exports.jsonParseStringify      =  jsonParseStringify;
