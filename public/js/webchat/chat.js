
// var socket = io.connect('http://localhost');
// 
// socket.on('connect', function() {
	// socket.emit('');
// })
// 
// socket.on('news', function(data) {
	// console.log(data);
	// socket.emit('my other event', {
		// my : 'data'
	// });
// });

var WebChat = {
	userid : null,
	username : null,
	nickname : null,
	
	init : function(options){
		this.userid = options.userid;
		this.username = options.username;
		this.nickname = options.nickname;
	},
	showUser : function(){
		$(".userlist").append('<div class="useritem">' + this.nickname + '</div>');
	}
};

function showUser(userinfo){
	$(".userlist").append('<div class="useritem">' + userinfo.nickname + '</div>');
}
// 
// jQuery.extend(WebChat.prototype, {
	// userid : null,
	// username : null,
	// nickname : null,
// 	
	// init : function(options){
		// this.userid = options.userid;
		// this.username = options.username;
		// this.nickname = options.nickname;
	// },
	// showUser : function(){
		// $(".userlist").append('<div class="useritem">' + this.nickname + '</div>');
	// }
// });

jQuery(document).ready(function(){
	console.log('userinfo = ' + userinfo);
	WebChat.init(userinfo);
	WebChat.showUser();
	showUser(userinfo);
});



