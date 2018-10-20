
/*-----------------------------------------------------------------------
   * @ file        : books.js
   * @ description : Here defines all books routes.
   * @ author      : Shivakumar
   * @ date        : 
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


    // Create new Book.
    {
        method: 'POST',
        path: '/v1/books/addBook',
        config: {
            description: 'Api service used to add a new Book .',
            notes: 'notes',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {
                    
                     bookName        : Joi.string().required(),
                     bookAuthor      : Joi.string().required(),
                     datepublished   : Joi.date().required(),
                     quantity        : Joi.number().required()
                     
                },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
        
            request.payload.adminData = request.pre.verify.data;
            Controllers.books.addBook(request.payload, (err, res) => {
                if (err) {
                    reply(err)
                }else {
                    reply(res)
                }
            });
        }
    },

     // List Books.
    {
        method: 'POST',
        path: '/v1/books/booksList',
        config: {
            description: 'Api service used to list books.',
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
            Controllers.books.booksList(request.payload, (err, res) => {
                if (err) {
                    reply(err)
                }else {
                    reply(res)
                }
            });
        }
    },

     // Update Book Details.
    {
        method: 'POST',
        path: '/v1/books/editBook',
        config: {
            description: 'Update book Details.',
            notes: '&bull; <b>x-logintoken</b>: Here you need to pass login token of the user through request header <b>(required)</b>.<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>oldPassword</b>: The password of the user used recently <b>(required)</b>.<br/>&bull; <b>newPassword</b>: Should carry an alpha numeric password for the user account <b>(required)</b>.',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {

                    bookName        : Joi.string().required(),
                    bookAuthor      : Joi.string().required(),
                    datepublished   : Joi.date().required(),
                    quantity        : Joi.number().required()

                },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
            request.payload.userData = request.pre.verify.data;
            Controllers.books.editBook(request.payload, (err, res) => reply(err||res));
        }
    },

    // Delete book.
    {
        method: 'POST',
        path: '/v1/books/deleteBook',
        config: {
            description: 'Delete book.',
            notes: '&bull; <b>x-logintoken</b>: Here you need to pass login token of the user through request header <b>(required)</b>.<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>oldPassword</b>: The password of the user used recently <b>(required)</b>.<br/>&bull; <b>newPassword</b>: Should carry an alpha numeric password for the user account <b>(required)</b>.',
            tags: ['api'],
            pre: [{ method: CheckUtils, assign: 'verify' }], // middleware to verify logintoken before proceeding.
            validate: {
                headers: Joi.object({
                    'x-logintoken': Joi.string().trim().required()
                }).options({allowUnknown: true}),
                payload: {
                    bookName        : Joi.string().required()
                },
                failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: (request, reply) => {
            request.payload.userData = request.pre.verify.data;
            Controllers.books.deleteBook(request.payload, (err, res) => reply(err||res));
        }
    }

];
