
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

    // Add Admin Details for first time.
    addAdmin: (data, callback) => {

        var new_user = {

            role          : 0,
            firstName     : "Shiva",
            lastName      : "Kumar",
            email         : "admin@shiva.com",
            password      : Utils.universalfunctions.encryptpassword("admin@123"),
           
        };

        Models.users(new_user).save(function (err,res) {
            if (err) {
                callback("Admin already exist.", null)
            }else {
                callback(null,{status:200, message:"Admin added successfully."})
            }
        })

    },

    // Register new employees.

    addUser  : (data, callback) => {

        async.waterfall([

            // Check the user have permission to do this activity or not.
            function (cb) {
                console.log('----------Executing 1st function----------')
                if(data.adminData.role === 0){
                    cb(null, data)
                }else {
                    cb(Utils.responses.unAuthAccess,null)
                }

            },

            // Check the user email already exist or not.
            function (data, cb) {
                console.log('----------Executing 2nd function----------')
                Models.users.findOne({email: data.email, is_deleted: false}, function (err, res) {
                    if(err){
                        cb(err)
                    }else if(res == null){
                        cb(null, data)
                    }else{
                        cb(Utils.responses.emailAlreadyExists, null)
                    }
                });

            },
            // Add new user to the database.
            function (data,cb) {
                console.log('----------Executing 3rd function----------')
                //  var email_verification_token = Utils.universalfunctions.generateRandomString(4);
                 //console.log("-------email_verification_token at add newEmp is------", email_verification_token);
                 var new_user = {

                    role          : data.role,
                    firstName     : data.firstName,
                    lastName      : data.lastName,
                    email         : data.email,
                    password      : Utils.universalfunctions.encryptpassword(data.password),
                    contactNo     : data.contactNo,
                    created_by    : data.adminData._id
                };

                Models.users(new_user).save(function (err,res) {
                    console.log("------db res at save new emp Obj----", err, res);
                    if (err) {
                        cb({status:400, message:"User is already exist."})
                    }else {
                        cb(null,{status:200, message:"New User added successfully."})
                    }
                })
            }
            
        ],callback);
    },

    // User login.
    login   : (data, callback) => {

        async.waterfall([

            function (cb) {

                var queryObj = {
                    email      : data.email,
                    password   : Utils.universalfunctions.encryptpassword(data.password),
                    is_deleted : false
                };

                Models.users.findOne(queryObj).exec(function (err,res) {

                    if (res) {
                        if (res.is_suspended) {
                            cb(Utils.responses.suspended)
                        }else {

                            var tokenObj = {

                                email    : res.email,
                                firstName: res.firstName,
                                role     : res.role
                            };

                            var login_token = jwt.sign(tokenObj,Configs.CONSTS.jwtkey, { algorithm: Configs.CONSTS.jwtAlgo, expiresIn: '10 days' }),

                            data1 = {
                                user_id: res._id,
                                login_token: login_token,
                                user_data : tokenObj
                            };

                            cb(null,data1)
                        }
                    }else {
                        cb(err || Utils.responses.invalidCredentials)
                    }
                });
            },
            function (data1,cb) {

                var queryObj = {
                    _id: data1.user_id
                },
                updateObj = {
                    login_token : data1.login_token
                },
                options = {
                    upsert: false,
                    new: true
                };

                Models.users.findOneAndUpdate(queryObj,updateObj,options).lean().exec(function (err,res) {
                    console.log('----------- err,res  at update token in DB-----------',err,res);
                    if (res) {

                        var response = {
                            login_token: res.login_token,
                            user_data :{
                                            firstName   : res.firstName,
                                            lastName    : res.lastName,
                                            email       : res.email

                                        }

                        };

                        cb(null,response);
                    }else
                        cb(err || Utils.responses.systemError)
                });
            }
        ],callback);
    },

    // List the employees.
    userList : (data, callback) => {

        if(data.adminData.role === 0){
            Models.users.find({role:{$ne:0}}).exec(function(err,res){
                if (err) {
                    callback(Utils.responses.systemError)
                }else{
                    var res = res.map(function(obj){
                        var obj ={
                            _id          : obj._id,
                            firstName    : obj.firstName,
                            lastName     : obj.lastName,
                            email        : obj.email
                            
                        };
                        return obj;
                    })

                    var responses = {

                        status    : "success",
                        statusCode : 200,
                        message    : "User list fetched successfully.",
                        data       : res
                    };

                    callback (null,responses);
                }
            })
        }
            
        //     Models.users.find({role: { $ne: 0 }, "is_deleted": false }).sort({created_at: -1}).exec(function (err,res) {

        //         if(err) {

        //             callback(Utils.responses.systemError)

        //         }else if(res.length>0){

        //             var resultData = [], cnt=0;

        //             res.forEach(function(userObj){
                        
        //             });
        //             _.each(res, function(userObj){

        //                 var queryObj= {
        //                     resume       : false,
        //                     revoke       : true,
        //                     is_suspended : false,
        //                     empId        : userObj._id
        //                 };

        //                 Models.users.find(queryObj).lean().exec(function (err, res1) {
                            
        //                     if(err){
        //                         cnt++;
        //                         if(cnt = res.length){
        //                             callback({status:'error', statusCode : 500, message:"Technical error. Please try again later."}, null)
        //                         }
        //                     }else{

        //                         if(res1.length>0){
        //                             var usersArr = res1.map(a => a.empId);
        //                             var obj = JSON.parse(JSON.stringify(userObj));
        //                             obj.users = usersArr;
        //                             resultData.push(obj);
        //                             cnt++;
        //                             if(cnt = res.length){
        //                                 callback(null, {status:'success', statusCode : 200, message:"Employees list fetched successfully.", data: resultData})
        //                             }
        //                         }else{
        //                             var obj = JSON.parse(JSON.stringify(userObj));
        //                             obj.users = [];
        //                             resultData.push(obj);
        //                             cnt++;
        //                             if(cnt = res.length){
        //                                 callback(null, {status:'success', statusCode : 200, message:"Employees list fetched successfully.", data: resultData})
        //                             }
        //                         }
        //                     }
        //                 });

        //                 var resp = res.map(function(obj){
        //                     var obj = {
        //                         _id      : obj._id,
        //                         firstName : obj.firstName,
        //                         lastName  : obj.lastName,
        //                         empId     : obj.empId,
        //                         dateOfJoining : obj.dateOfJoining,
        //                         designation : obj.designation,
        //                         email : obj.email
                            
        //                     };
        //                     return obj;
        //                 })
        //             });


        //             var responses = {
        //                 status     : "success",
        //                 statusCode : 200,
        //                 message    : "Users list fetched successfully.",
        //                 data       : res
        //             };
        //             callback(null, responses);

        //         }else{

        //             var responses = {
        //                 status     : "success",
        //                 statusCode : 200,
        //                 message    : "No employees."
        //             };
        //             callback(null, responses);

        //         }

        //     });

        // }else {
        //     callback(Utils.responses.unAuthAccess,null)
        // }

    },
    
    // Edit user.
    editUser  : (data, callback) => {

        async.waterfall([

            // check the user is auth or not to do this activity.
            function (cb) {

                if(data.userData.role === 0){
                    cb(null, data)
                }else {
                    cb(Utils.responses.unAuthAccess,null)
                }


            },

            // Check the user email already exist or not.
            function (data, cb) {

                Models.users.findOne({email: data.email, is_deleted: false}, function (err, res) {
                    if(err){
                        cb(err)
                    }else if(res == null){
                        var errObj = {
                            status : "error",
                            statusCode : 401,
                            message    : "User doesn't exist."
                        }
                        cb(errObj, null)
                    }else{
                        cb(null, res)
                    }
                });

            },

            // Update emp details.
            function (data1,cb) {
               
               var queryObj = {

                    email: data.email,
                    _id: data1._id

               };
               var updateObj = {

                    role          : data.role,
                    firstName     : data.firstName,
                    lastName      : data.lastName,
                    email         : data.email,
                    
                    modified_by   : data.userData._id,
                    modified_at   : new Date().toISOString()
                };

                if(data.password){
                    updateObj.password = Utils.universalfunctions.encryptpassword(data.password);
                };

                var options = {
                    new : true
                };

                Models.users.findOneAndUpdate(queryObj, updateObj, options, function (err,res) {
                    console.log("------db res at save Obj----", err, res);
                    if (err) {
                        cb(err)
                    }else {
                        cb(null,{status:200, message:"User data updated successfully."})
                    }
                })
            }
            
        ],callback);
    }, 

    // Delete User.
    deleteUser: (data, callback) => {

        var queryObj = {
            email: data.email
        };
        var updateObj = {

            is_deleted  : true,
            modified_at : Date.now()
        };

        var options = {
            new : true
        };

        Models.users.findOneAndUpdate(queryObj, updateObj, options, function (err,res) {
            console.log("------db res at delete Obj----", err, res);
            if (err) {
                callback(err)
            }else {
                callback(null,{status:200, message:"User deleted successfully."})
            }
        })

    }


};
