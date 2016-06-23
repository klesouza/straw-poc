var straw = require('../straw/straw');
var net = require('net');

module.exports = straw.node({
    initialize: function (opts, done) {
        console.log('init');
        done();
    },
    stop: function (done) {
        console.log('stop');
        done();
    },
    start: function (done) {
        var self = this;
        console.log('start');
        this.client = net.connect({port: 8124}, function(){
            console.log('connected');
        });
        this.client.on('error', function(r){
            console.log('error' + r);
        })
        this.client.on('data', function (data) {
            console.log('data');
            self.output(data);
        })
        // setInterval(function(){
        //     console.log('interval');
        //     self.output(new Date());
        // },300);
        done();
    }
});