
webchat.sockets.io = {
	socket : null,
	init : function(){
		this.socket = io.connect(webchat.sockets.config.host);
		this.socket.on('connect', function(){
			
		});
	}
}