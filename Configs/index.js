
/*-----------------------------------------------------------------------
   * @ file        : index.js
   * @ description : Main module to incluse all the configs.
   * @ author      : velishod Rohith
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';

module.exports =  {

    db     : require ("./dbConfig"),
    app    : require ("./appConfig"),
    SMTP   : require ("./smtpConfig"),
    CONSTS : require ("./constants"),
   
};





