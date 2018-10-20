
'use strict';

module.exports = [

    {
        register: require('inert'),
        options: {}
    },
    {
        register: require('vision'),
        options: {}
    },
    {
            'register': require('hapi-swagger'),
            'options': {
                info: {
                    'title': 'My Project API Documentation',
                    'version': '1.0.0'
                },
                pathPrefixSize: 2,
                basePath: '/v1',
                tags:[
                    {
                        name:'Users',
                        description:"All API's about User Operations"
                    } 
                ]
            }
    },
    {
        register: require('good'),
        options : {
            ops: {
                interval: 1000
            },
            reporters: {
                myConsoleReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    },
    {
        register: require('./custom_Init'),
        options: {}

    }

];
