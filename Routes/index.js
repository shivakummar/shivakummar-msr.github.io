
/*-----------------------------------------------------------------------
   * @ file        : index.js
   * @ description : Main module to incluse all the Routes.
   * @ author      : Velishod Rohith
   * @ date        :
-----------------------------------------------------------------------*/

'use strict';

const users           = require('./users');
const books        = require('./books');

module.exports = [].concat(users, books);
