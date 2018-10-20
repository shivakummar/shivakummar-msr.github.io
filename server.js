

const Hapi     = require('hapi');
const mongoose = require('mongoose');

const plugIns  = require('./PlugIns');
const configs  = require('./Configs');
const env      = require('./env');
const Utils      = require('./Utils');
const app      = configs.app[env.instance];
const db       = configs.db [env.instance];
const server   = new Hapi.Server();
const routes   = require('./Routes');
const scheduler= require('./Utils').scheduler;


console.log(app);
server.connection({
    host: app.host,
    port: app.port,
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['x-logintoken'],
            additionalExposedHeaders: ['x-logintoken']
        }
    },
    labels: ['api']
},{
    timeout:{
        server: 50000
    }
});


// server.connection({
//     port: app.socket,
//     labels: ['ws']
// });

const apiServer = server.select('api');

console.log('\x1b[32m',"+++ SERVER SETTINGS LOADED +++\r\n" +JSON.stringify(app)  + "\n");

server.route(routes);

server.register(plugIns,function(err) {
    
    if (err) {
        throw err;
    }
    
    server.start(function(err) {
        if (err) {
            console.log('\x1b[31m',"+++ Error starting server +++");
            throw err;
        } else{
           
            console.log('\x1b[32m', '+++ SERVER STARTED +++\r\nServer running ');
        };
    });
});


const Db_Options = {
    db     : { native_parser: true },
    server : { poolSize: 5 },
    user   : db.username,
    pass   : db.password
};

const mongoUrl = 'mongodb://'+db.host+':'+db.port+'/'+db.name;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl,Db_Options,function(err) {
    if (err) {
        console.log('\x1b[31m',"DB Error: "+ err);
        process.exit(1);
    } else{
        
        console.log('\x1b[32m','MongoDB Connected :'+ mongoUrl);
    }
});
