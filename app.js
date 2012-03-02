
var express = require('express'),
	app = express.createServer(),
	redis = require('redis'),
	db = redis.createClient(),
	util = require('util');
	RedisStore = require('connect-redis')(express),
	register = require('./server/register'),
	login = require('./server/login'),
	io = require('socket.io').listen(app),
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

db.on("error", function (err) {
    console.log("Error " + err);
});

//router setting
app.get('/', function(req, res){
	req.session.username = "walt";
	res.render('index.jade', {title: "Welcom to Web Chat"});
	console.log('session.username = ' + req.session.username);
});

app.get('/chat', function(req, res){
	if(req.session.userinfo){
		res.render('chat.jade', {userinfo : req.session.userinfo});
	}else{
		res.send("Not found", 404);
	}
});

app.post('/login', function(req, res){
	console.log('db = ' + db);
	login.login(req, res, db);
});

app.post('/register', function(req, res){	
	register.register(req, res, db);
})

//socket io setting
io.sockets.on('connection', function(socket){
	
});


app.listen(4000);

console.log('Server Started on port 4000');