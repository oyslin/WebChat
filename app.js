
var express = require('express'),
	app = express.createServer(),
	redis = require('redis'),
	redisDB = redis.createClient(),
	util = require('util');
	RedisStore = require('connect-redis')(express),
	register = require('./server/register'),
	login = require('./server/login'),
	sockets = require('./server/sockets'),
	io = require('socket.io').listen(app),
	HashMap = require('./server/HashMap'),
	socketMap = new HashMap.HashMap,
	sessionStore = new RedisStore;

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false});
	app.use(express.cookieParser());
	app.use(express.session({secret: "web chat", store: sessionStore}));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

redisDB.on("error", function (err) {
    console.log("Error " + err);
});

//router setting
app.get('/', function(req, res){
	if(req.session.userinfo != null){
		res.redirect('/chat');
	}else{
		res.render('index.jade', {title: "Welcom to Web Chat"});
	}
});

app.get('/chat', function(req, res){
	if(req.session.userinfo){
		res.render('chat.jade', {userinfo : req.session.userinfo});
	}else{
		res.send("Not found", 404);
	}
});

app.post('/login', function(req, res){
	login.login(req, res, redisDB);
});

app.post('/register', function(req, res){
	register.register(req, res, redisDB);
});

app.get('/logout', function(req, res){
	req.session.destroy(function(err){
		if(err){
			console.log('Destroy session error!')
		}else{
			res.redirect('/');
		}
	});
});

//socket io setting
io.sockets.on('connection', function(socket){
	socket.on('register', function(data){
		console.log('data = ' + data.username);
		redisDB.get("login:" + data.username + ":userid", function(err, userid){
			console.log('err = ' + err + ", userid = " + userid);
			var userExists = false;
			if(userid != null){
				userExists = true;
			}
			socket.emit('register', {userExists : userExists});
		});
	});
	socket.on('fetchBuddy', function(data){
		
	});	
	
	socket.on('disconnect', function(){
		
	})
});

var chat =  io.of('/chat').on('connection', function(socket){
	console.log('chat connected!');
	socket.on('initConnect', function(data){
		var username = data.username;
		console.log('username = ' + username);
		socketMap.put(username, socket);
	});
});


app.listen(4000);

console.log('Server Started on port 4000');