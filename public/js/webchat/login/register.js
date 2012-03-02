
webchat.login.register = {
	checkInput : function(regform){
		with(regform){
			if(email.value == ""){
				console.log('email is null!')
				return false;
			}
		}
		return true;
	}
}
