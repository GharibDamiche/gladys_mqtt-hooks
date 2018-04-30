module.exports = function (sails) {

    var exec = require('./lib/exec.js');
    var connect = require('./lib/connect.js');
    return {
        exec,
    };
};
