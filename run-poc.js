var straw = require('./straw/straw');
var os = require('os');
var tap = straw.tap({
    id: 'process',
    node: 'process',
    input: 'process',
    redis: {
        host: 'redis',
        port: 6379
    }
});

tap.on('message', function (msg) {
    console.log('message '+os.hostname);
})

