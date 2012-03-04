var util = require('util');

function login(req, res, db){
	var reqbody = req.body,
		username = reqbody.email,
		password = reqbody.password,
		persistent = reqbody.persistent;
	console.log('reqbody = ' + util.inspect(reqbody));
	
	db.get("login:" + username + ":password", function(err, pass){		
		if(err){
			res.send("Not found", 404);
		}else{
			if(password == pass){
				db.get("login:" + username + ":userid", function(err, userid){
					if(err){
						console.log('Get userid error!');
					}else{
						db.hmget('userinfo:' + userid, "nickname", function(err, userinfo){
							if(err){
								console.log('Get userinfo erro!');
							}else{
								//if keep login, set session								
								req.session.userinfo = {
									userid : userid,
									username : username,
									nickname : userinfo[0] 
								};
								if(persistent == 1){
									_setExpireDate(req, true);
								}else{
									_setExpireDate(req, false);
								}
								
								res.redirect('/chat');
							}
						});
					}
				})
			}else{
				res.redirect('back');
			}
		}
	})	
}

function _setExpireDate(req, keepSession){
	if(keepSession){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 7);
		req.session.cookie.expires = expireDate;
	}else{
		req.session.cookie.maxAge = null;
	}	
}

exports.login = login;