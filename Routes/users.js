
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : Here defines all users routes.
   * @ author      : Shivakumar
   * @ date        : 16/10/2018
-----------------------------------------------------------------------*/

'use strict';

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
const Joi         = require('joi');
const Boom        = require('boom');

const Controllers = require('../Controllers');
const Utils       = require('../Utils');
var CheckUtils    = require('../Utils/universalfunctions').require_login;

module.exports    = [
    
    // Admin first Time registeratation api
    {
        method: 'POST',
        path: '/v1/Users/addAdmin',
        config: {
            description: 'Api service used to add admin details for one time only.',
            notes: '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>role</b>: Which defines the user type. It should contain 1 of 2 values either <b>1</b> for <b>Driver</b> or <b>2</b> for <b>Space Owner</b>.<br/>&bull; <b>first_name</b>: Should carry the space saperated Full name of the user with not more than 20 characters. <br/>&bull; <b>Phone</b>: The contact number of the user on which he/she will recieve an OTP for Verification.<br/>&bull; <b>Password</b>: Should carry an alpha numeric password for the user account.<br/><br/><b>During the development phase the phone numbers to be used, shold be lnked with twilio account for recieving SMS</b>. ',
            tags: ['api'],
            validate: {
                payload: {},
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
        
            //request.payload.adminData = request.pre.verify.data;
            Controllers.users.addAdmin(request.payload, (err, res) => {
                if (err) {
                    reply(err)
                }else {
                    reply(res)
                }
            });
        }
    },

    // Register api
    {
        method: 'POST',
        path: '/v1/Users/addUser',
        config: {
            description: 'Api service used to add a new user .',
            notes: '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>role</b>: Which defines the user type. It should contain 1 of 2 values either <b>1</b> for <b>Driver</b> or <b>2</b> for <b>Space Owner</b>.<br/>&bull; <b>first_name</b>: Should carry the space saperated Full name of the user with not more than 20 characters. <br/>&bull; <b>Phone</b>: The contact number of the user on which he/she will recieve an OTP for Verification.<br/>&bull; <b>Password</b>: Should carry an alpha numeric password for the user account.<br/><br/><b>During the development phase the phone numbers to be used, shold be lnked with twilio account for recieving SMS</b>. ',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {
                    
                    role          : Joi.number().required().valid(0, 1),      // 0- Admin, 1-normal user.
                    firstName     : Joi.string().trim().required().label('firstName'),
                    lastName      : Joi.string().trim().required().label('lastName'),
                    contactNo     : Joi.string().required().label('contactNo'),
                    email         : Joi.string().email().lowercase().label('Email'),
                    password      : Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).options({ language: { string: { regex: { base: 'must be alphanumeric with atleast one special character with min length 6.' } } } }).required().label('Password')
                },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
        
            request.payload.adminData = request.pre.verify.data;
            Controllers.users.addUser(request.payload, (err, res) => {
                if (err) {
                    reply(err)
                }else {
                    reply(res)
                }
            });
        }
    },

    // Login api
    {
        method: 'POST',
        path: '/v1/Users/login',
        config: {
            description: 'Api service used for logging into the app.',
            notes: 'The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Phone</b>: The contact number of the user used while creating the account.<br/>&bull; <b>Password</b>: Should carry an alpha numeric password for the user account.',
            tags: ['api'],
            validate: {
                payload: {
                    email    : Joi.string().email().lowercase().label('Email'),
                    password : Joi.string().required().label('Password')
                    },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
            console.log( "\x1b[34m\x1b[1m",'USERS' );
            Controllers.users.login(request.payload, (err, res) => {
                if (err)
                    reply(err);
                else{
                    var response = Utils.responses.loginSuccessfull;
                    response.result = res.user_data;
                    reply(response).header('X-logintoken', res.login_token);
                }
            });
        }
    },

     // List users
    {
        method: 'POST',
        path: '/v1/Users/userList',
        config: {
            description: 'Api service used to list employees.',
            notes: '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>role</b>: Which defines the user type. It should contain 1 of 2 values either <b>1</b> for <b>Driver</b> or <b>2</b> for <b>Space Owner</b>.<br/>&bull; <b>first_name</b>: Should carry the space saperated Full name of the user with not more than 20 characters. <br/>&bull; <b>Phone</b>: The contact number of the user on which he/she will recieve an OTP for Verification.<br/>&bull; <b>Password</b>: Should carry an alpha numeric password for the user account.<br/><br/><b>During the development phase the phone numbers to be used, shold be lnked with twilio account for recieving SMS</b>. ',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {},
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
        
            request.payload.adminData = request.pre.verify.data;
            Controllers.users.userList(request.payload, (err, res) => {
                if (err) {
                    reply(err)
                }else {
                    reply(res)
                }
            });
        }
    },

    // Update user Profile.
    {
        method: 'POST',
        path: '/v1/Users/editUser',
        config: {
            description: 'Update User Profile.',
            notes: '&bull; <b>x-logintoken</b>: Here you need to pass login token of the user through request header <b>(required)</b>.<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>oldPassword</b>: The password of the user used recently <b>(required)</b>.<br/>&bull; <b>newPassword</b>: Should carry an alpha numeric password for the user account <b>(required)</b>.',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {
                    role          : Joi.number().required().valid(0, 1),      // 0- Admin, 1-normal user.
                    firstName     : Joi.string().trim().required().label('firstName'),
                    lastName      : Joi.string().trim().required().label('lastName'),
                    contactNo     : Joi.string().required().label('contactNo'),
                    email         : Joi.string().email().lowercase().label('Email'),
                    password      : Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).options({ language: { string: { regex: { base: 'must be alphanumeric with atleast one special character with min length 6.' } } } }).required().label('Password')
                },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
            console.log( "\x1b[34m\x1b[1m",'USERS' );
            request.payload.userData = request.pre.verify.data;
            Controllers.users.editUser(request.payload, (err, res) => reply(err||res));
        }
    },

    // Delete user.
    {
        method: 'POST',
        path: '/v1/Users/deleteUser',
        config: {
            description: 'Delete User.',
            notes: '&bull; <b>x-logintoken</b>: Here you need to pass login token of the user through request header <b>(required)</b>.<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>oldPassword</b>: The password of the user used recently <b>(required)</b>.<br/>&bull; <b>newPassword</b>: Should carry an alpha numeric password for the user account <b>(required)</b>.',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {
                    email : Joi.string().required()
                },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
            console.log( "\x1b[34m\x1b[1m",'USERS' );
            request.payload.userData = request.pre.verify.data;
            Controllers.users.deleteUser(request.payload, (err, res) => reply(err||res));
        }
    },


];
