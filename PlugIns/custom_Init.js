
'use strict';

// Include internal modules.
const configs  = require('../Configs');
const env      = require('../env');
const app      = configs.app[env.instance];

var custom_Init = {
  register: function (server, options, next) {
    console.log('CUSTOM PLUGIN: (1) ************** LOADING Init index route. *************');
    // Init the index route.
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'client2',
                listing: true
            }
        }
    });
    /*server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        return reply({
            name     : app.name,
            endpoint : app.host,
            port     : app.port
        }).code(201);
      }
    });*/
    next()
  }
}

custom_Init.register.attributes = {
  name: 'index-route',
  version: '1.0.0'
}

module.exports = custom_Init
