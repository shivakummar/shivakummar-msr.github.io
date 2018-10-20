
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : Here defines users schema.
   * @ author      : Velishod Rohith
   * @ date        : 
-----------------------------------------------------------------------*/


const Mongoose     = require ('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema       = Mongoose.Schema;
const env          = require('../env');

if (env.instance == "dev") {
    Mongoose.set('debug', true); // console mongo queries.
}

var UserSchema = new Schema({

    // User Info.
    role           : { type: Number, required: true , default: 1 }, // 0- Admin, 1- normaluser.
    firstName      : { type: String, required: true },
    lastName       : { type: String, required: true },
    contactNo      : { type: String },
    emerContactNo  : { type: String },
    email          : { type: String, required: true, unique : true, index: true }, 
    password       : { type: String, required: true },
    login_token    : { type: String, default: '' },

   

    // verified Status.
    phone_is_verified        : { type: Boolean, default: false },
    email_is_verified        : { type: Boolean, default: true },
    email_verification_token : { type: String, default: '' },
    forget_verify_token      : { type: String, default: '' },
    forgetPassword           : { type: Boolean, default: false },

    // Basic validations.
    created_at     : { type: Date, default: getTimeStamp },
    created_by     : { type: Schema.ObjectId, ref: `user` },
    modified_by    : { type: Schema.ObjectId, ref: `user` },
    modified_at    : { type: Date },
    is_active      : { type: Boolean, default: true },  
    is_suspended   : { type: Boolean, default: false },
    is_deleted     : { type: Boolean, default: false },
    is_confirmed   : { type: Boolean ,default: true }

});

UserSchema.plugin(autopopulate);
var users = Mongoose.model('users', UserSchema);
module.exports = users;

function getTimeStamp() {
    //return (Date.now() / 1000)
    return (new Date().toISOString())
}
