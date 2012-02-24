var util = require('util');

function login(req, res, db){
	var reqbody = req.body,
		username = reqbody.username,
		password = reqbody.password;
	console.log('username =' + username);
	console.log('password =' + password);
	db.get("login:" + username + ":password", function(err, pass){
		console.log('pass =' + pass);
		if(err){
			res.send("Not found", 404);
		}else{
			if(password == pass){				
				db.get("login:" + username + ":userid", function(err, userid){
					if(err){
						
					}else{
						db.hmget('userinfo:' + userid, "username", "password", "nickname", function(err, userinfo){
							if(err){
								
							}else{
								console.log('userinfo = ' + util.inspect(userinfo));
								res.render('chat.jade');
							}
						});
					}
				})
			}else{
				res.send("Not found", 404);
			}
		}
	})	
}

exports.login = login;