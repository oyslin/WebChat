
function checkUserExists(username, db){	
	db.get("login:" + username + ":userid", function(err, userid){
		console.log('err = ' + err + ", userid = " + userid);
		if(userid == null){
			return false;
		}else{
			return true;
		}
	});
}

exports.checkUserExists = checkUserExists;