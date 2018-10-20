/*-----------------------------------------------------------------------
   * @ file        : books.js
   * @ description : Here defines books schema.
   * @ author      : shivakumar
   * @ date        : 
-----------------------------------------------------------------------*/


const Mongoose     = require ('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema       = Mongoose.Schema;
const env          = require('../env');

if (env.instance == "dev") {
    Mongoose.set('debug', true); // console mongo queries.
}

var booksSchema = new Schema({

    // Client Info.
    bookName        : { type: String, required: true },
    bookAuthor      : { type: String, required:true  },
    datePublished   : { type: Date, required:true    },
    quantity        : { type: Number, required: true },


    // Basic validations.
    created_at     : { type: Date, default: getTimeStamp }, 
    created_by     : { type: Schema.ObjectId, ref: `user`,autopopulate: true },
    modified_at    : { type: Date },
    modified_by    : { type: Schema.ObjectId, ref: `user`,autopopulate: true },
    is_active      : { type: Boolean, default: true },
    is_suspended   : { type: Boolean, default: false },
    is_deleted     : { type: Boolean, default: false },
    is_confirmed   : { type: Boolean ,default: true }

    

});

booksSchema.plugin(autopopulate);
var books = Mongoose.model ('books', booksSchema);
module.exports = books;

function getTimeStamp() {
    
    return (new Date().toISOString())
}
