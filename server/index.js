const loki = require('lokijs'),
      db = new loki('./data/data.json',{}),
      http = require('http'),
      server = http.createServer(function(request, response){}),
      socketIO = require('socket.io'),
      io = socketIO(server),
      cors = require('cors'),
      config = require('./config.js');
;

// app.use(cors());

db.loadDatabase({},()=> {
    let children = db.getCollection('children')
    io.on('connection', (client) => {
        console.log('client connected')
        // read all
        client.on('getRecs',(cat) => {
            let data = filter(children.data,cat)
            io.sockets.emit('getRecs',data)
        })
        // read ones
        client.on('getDish',(loki_id) => {
            let data = children.get(loki_id)
            // console.log(data)
            io.sockets.emit('getDish',data)
        })        
        // create
        client.on('add_dish',data => {
            children.insert(data)
            db.saveDatabase();
            // console.log(children,'Ужин')
            // console.log(children.data)
        })
        // delete
        client.on('delete_dish',id => {
            let obj = children.findOne({['$loki']:id });
            children.remove(obj)
            db.saveDatabase();
        })
        // update
        client.on('update_dish',data => {
          // console.log(data.id)
            let obj = children.findOne({['$loki']:data.id });
              obj.title = data.title
              obj.description = data.description
              obj.category = data.category
              obj.ingr = data.ingr
              obj.calory = data.calory
            children.update(obj);
            db.saveDatabase();
        })
    })

    let result = children.find();
    result.forEach(element => {
        // console.log(element)
    });
    
})

function filter (array,param) {
	var arr =  array.filter(function(item) {
		return (item.category == param);
    });
        return arr
}

server.listen(config.port,config.host,() => console.log('Socket ready on'+config.host+' port:'+config.port));

io.on('connection', function (socket) {
    console.log('A client is connected!');   
});

// children.get(1); // returns Sleipnir
// children.find( {'name':'Sleipnir'} )
// children.find( { legs: { '$gt' : 2 } } )
    // children.insert({
    //     name:'пирог',
    //     desr:'вкусный',
    //     cat: 'десерт',
    //     ingr: [{name:'тесто',count:1}
    //             ,{name:'масло',count:2}
    //             ,{name:'ягоды',count:3}
    //         ]
    // })
    // db.saveDatabase();
    // delete_item(1)
    // update_item(1)
    // show_items()
    // delete_item(12)

    // let result = children.find();
    // result.forEach(element => {
    //     console.log(element)
    // });
