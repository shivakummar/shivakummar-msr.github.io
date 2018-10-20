
module.exports = {

    dev: {
        name         : "Management",
        host         : "127.0.0.1",
        port         : "9000",
        socket       : "5500",
        absolutePath : __dirname+"/..",
        debug        : true
    },
    development: {
        name         : "Management",
        host         : "0.0.0.0",
        port         : "9010",
        socket       : "5500",
        absolutePath : __dirname+"/..",
        debug        : true
    },
    test: {
        name         : "Management",
        host         : "",
        port         : "",
        absolutePath : __dirname+"/..",
        debug        : true
    
    },
    live: {
        name         : "Management",
        host         : "",
        port         : "",
        absolutePath : __dirname+"/..",
        debug        : true
    }

};
