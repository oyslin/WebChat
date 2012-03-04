var util = require('util');

function register(req, res, db){
	var reqBody = req.body,
		username = reqBody.email,
		password = reqBody.password,
		nickName = reqBody.nickname;		
	
	var userid = db.get("userid", function(err, userid) {
		if(err) {
			userid = 1;
		}

		db.incr("userid");

		var hashkey = "userinfo:" + userid, userInfo = {
			"username" : username,
			"password" : password,
			"nickname" : nickName
		}

		db.hmset(hashkey, userInfo, function(err, res) {
			if(err) {
				console.log('insert user err');
			}
		});
		db.set("login:" + userid + ":username", username);
		db.set("login:" + userid + ":password", password);
		db.set("login:" + username + ":userid", userid);
		db.set("login:" + username + ":password", password);

		req.session.userinfo = {
			userid : userid,
			username : username,
			nickname : nickName
		};
		res.redirect('/chat');
	});	
}

exports.register = register;