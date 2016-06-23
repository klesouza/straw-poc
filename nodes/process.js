var straw = require('../straw/straw');
var os = require('os');

module.exports = straw.node({
    process: function (msg, done) {
        var self = this;
        var host = os.hostname();
        console.log(host);
        console.log(msg);
        done();
    }
});