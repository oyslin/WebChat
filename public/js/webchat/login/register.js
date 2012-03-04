
webchat.login.register = {	
	checkInput : function(regform){		
		if(this._checkBlank(regform) || !this._checkEmail(regform) || !this._checkPass(regform)){
			return false;
		}else{
			this._checkUserExists(regform);
			this.regform = regform;
			return false;
		}
		return true;
	},
	_checkBlank : function(regform){
		var blank = false;
		with(regform){
			if(email.value.trim() == ""){
				$('.emailWarning').show();
				blank = true;
			}else{
				$('.emailWarning').hide();
			}
			if(password.value.trim() == ""){
				$('.passWarning').show();
				blank = true;
			}else{
				$('.passWarning').hide();
			}
			if(confirmpassword.value.trim() == ""){
				$('.confirmpassWarning').show();
				blank = true;
			}else{
				$('.confirmpassWarning').hide();
			}
			if(nickname.value.trim() == ""){
				$('.nicknameWarning').show();
				blank = true;
			}else{
				$('.nicknameWarning').hide();
			}
		}
		return blank;
	},
	_checkEmail : function(regform){
		var email = regform.email.value.trim();
		if (!webchat.util.functions.isEmail(email)) {			
			$('.emailWarning').text('Email address is invalid!');
			$('.emailWarning').show();
			return false;
		}
		return true;
	},
	_checkPass : function(regform){
		var pass = regform.password.value.trim(),
			confirmPass = regform.confirmpassword.value.trim();
		if(pass.length < 7){
			$('.passWarning').text('Password mush be at least 6 bit!');
			$('.passWarning').show();
			return false;
		}
		if(pass != confirmPass){
			$('.confirmpassWarning').text('The two password are not same!');
			$('.confirmpassWarning').show();
			return false;
		}
		return true;
	},
	_checkUserExists : function(regform){
		var email = regform.email.value.trim();		
		webchat.sockets.io.init();
		webchat.sockets.io.register(email, this._onServerCheckUserResult, this);
	},
	_onServerCheckUserResult : function(userExists){
		console.log('userExists = ' + userExists);
		if(userExists){
			$('.emailWarning').text('Email already exists!');
			$('.emailWarning').show();
		}else{
			this.regform.submit();
		}
	}
}
