var straw = require("./straw/straw");
var net = require('net');

var opts = {
    nodes_dir: __dirname + '/nodes',
    redis: {
        host: 'redis',
        port: 6379
    }
};
var clients = [];
var topo = straw.create(opts);

var s = net.createServer(function(c){  
    c.on('data', function(d){
        for(var i in clients){
            if(clients[i] != c)
                clients[i].write(d);
        }
    });
    c.on('end', function () {
    clients.splice(clients.indexOf(c), 1);
  });
    c.pipe(c);
})
s.on('error', function(a){
    console.log('error');
});
s.listen(8124, function(){
    topo.add([{
        id: 'entry',
        node: 'entry',
        output: 'process'
    }
    ,{
        id: 'process',
        node: 'process',
        input: 'process'
    }
    ], function(){
        topo.start({purge: true});
    });
});
s.on('connection', function(c){      
    clients.push(c);
});

process.on( 'SIGINT', function() {
  topo.destroy(function(){
    console.log( 'Finished.' );
  });
});