
webchat.sockets.io = {	
	socket : null,
	config : {
		mainHost : "http://192.168.1.101",
		chatHost : "http://192.168.1.101/chat"
	},
	_mainConnected : false,
	_chatConnected : false,
	init : function(host){
		if(host == 'main'){
			if(!this._mainConnected){
				this.socket = io.connect(this.config.mainHost);
				this.socket.on('connect', function(){
					console.log('Connected to server via Websocket.')
				});
				this._mainConnected = true;
			};
		}else{
			if(!this._chatConnected){
				this.socket = io.connect(this.config.chatHost);
				this.socket.on('connect', function(){
					console.log('Connected to server via Websocket.');					
				});
				this._chatConnected = true;
			}
		}
		
	},
	register : function(/*String*/ username, /*function*/ callback, /*object*/ obj){
		console.log('username = ' + username + ", callback = " + callback + ", obj = " + obj);
		this.socket.on('register', function(data){
			var userExists = data.userExists;
			if(userExists){				
				callback.call(obj, true);
			}else{
				callback.call(obj, false);
			}
		});
		this.socket.emit('register', {username : username});		
	},
	initConnect : function(/*String*/ username){
		this.socket.on('initConnect', function(data){
			if(data == null){
				console.log('Server check error!');
			}else{
				
			}
		});
		this.socket.emit('initConnect', {username : username});
	},
	sendMsg : function(/*String*/ from, /*String*/ to, /*String*/ msg){
		this.socket.emit('sendMsg', {from : from, to : to, msg : msg});
	},
	_onRegister : function(){
		
	}
}