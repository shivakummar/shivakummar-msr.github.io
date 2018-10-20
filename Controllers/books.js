
'use strict';

const Boom    = require('boom');
const async   = require('async');
const jwt     = require('jsonwebtoken');
const path    = require('path')
const fs      = require('fs');
const _       = require('underscore');
const Models  = require('../Models');
const Utils   = require('../Utils');
const Configs = require('../Configs');
const env     = require('../env');
const email_credentials  = Configs.SMTP[env.instance];
const logger  = Utils.logger;

module.exports = {

    // Register new books.
    addBook  : (data, callback) => {

        async.waterfall([

            // Check the user have permission to do this activity or not.
            function (cb) {

                if(data.adminData.role === 0){
                    cb(null, data)
                }else {
                    cb(Utils.responses.unAuthAccess,null)
                }

            },

            // Check the bookname already exist or not.
            function (data, cb) {

                Models.books.findOne({bookName: data.bookName, is_deleted: false}, function (err, res) {
                    if(err){
                        cb(err)
                    }else if(res == null){
                        cb(null, data)
                    }else{
                        cb(Utils.responses.bookAlreadyExists, null)
                    }
                });

            },

            // Add new book to the database.
            function (data,cb) {
                // var email_verification_token = Utils.universalfunctions.generateRandomString(4);
                // console.log("-------email_verification_token at add newEmp is------", email_verification_token);
                var new_book = {

                    bookName        : data.bookName,
                    bookAuthor      : data.bookAuthor,
                    datePublished   : data.datepublished,
                    quantity        : data.quantity,
                    created_by      : data.adminData._id
                };

                console.log('------------------new_book-------------------------',new_book);

                Models.books(new_book).save(function (err,res) {
                    console.log("------db res at save Obj----", err, res);
                    if (err) {
                        cb(err)
                    }else {
                        cb(null,{status:200, message:"New book added successfully."})
                    }
                })
            }
            
        ],callback);
    },

    // List the Books.
    booksList : (data, callback) => {

        if(data.adminData.role === 0){
            
            Models.books.find({ "is_deleted": false }).sort({created_at: -1}).exec(function (err,res) {

                if(err) {

                    callback(Utils.responses.systemError)

                }else {
                    var responses = {
                        status     : "success",
                        statusCode : 200,
                        message    : "books list fetched successfully.",
                        data       : res
                    };
                    callback(null, responses);
                }

            });

        }else {
            callback(Utils.responses.unAuthAccess,null)
        }

    },
    
     // Edit Book details.
    editBook  : (data, callback) => {

        async.waterfall([

            // check the user is auth or not to do this activity.
            function (cb) {

                if(data.userData.role === 0){
                    cb(null, data)
                }else {
                    cb(Utils.responses.unAuthAccess,null)
                }


            },

            // Check the bookname already exist or not.
            function (data, cb) {

                Models.books.findOne({bookName: data.bookName, is_deleted: false}, function (err, res) {
                    if(err){
                        cb(err)
                    }else if(res == null){
                        var errObj = {
                            status : "error",
                            statusCode : 401,
                            message    : "book doesn't exist."
                        }
                        cb(errObj, null)
                    }else{
                        cb(null, res)
                    }
                });

            },

            // Update project details.
            function (data1,cb) {
               
               var queryObj = {

                    bookName: data.bookName,
                    _id: data1._id

               };
               var updateObj = {

                    bookName        : data.bookName,
                    bookAuthor      : data.bookAuthor,
                    datePublished   : data.datepublished,
                    quantity        : data.quantity,
                    created_by      : data.adminData._id,
                    modified_at     : new Date().toISOString(),
                    modified_by     : data.userData._id
                    
                };

                var options = {
                    new : true
                };

                Models.books.findOneAndUpdate(queryObj, updateObj, options, function (err,res) {
                    console.log("------db res at update book document Obj----", err, res);
                    if (err) {
                        cb(err)
                    }else {
                        cb(null,{status:200, message:"Project data updated successfully."})
                    }
                })
            }
            
        ],callback);
    }, 

    // Delete Book.
    deleteBook: (data, callback) => {

        var queryObj = {
            bookName: data.bookName
        };
        var updateObj = {

            is_deleted  : true,
            modified_at : Date.now()
        };

        var options = {
            new : true
        };

        Models.books.findOneAndUpdate(queryObj, updateObj, options, function (err,res) {
            console.log("------db res at delete book Obj----", err, res);
            if (err) {
                callback(err)
            }else {
                callback(null,Utils.responses.bookDeleted)
            }
        })

    }


};
