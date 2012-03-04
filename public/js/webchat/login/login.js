
webchat.login.login = {
 	checkInput : function(loginform){
 		if(this._checkBlank(loginform) || !this._checkEmail(loginform)){
 			return false;
 		}
 		this._setCookie(loginform);
 		return true;
 	},
 	_checkBlank : function(loginform){
 		var blank = false;
 		with(loginform){
 			if(email.value.trim() == ""){
 				console.log('email = ' + email.value.trim());
 				this._showWarning(true, 'Email should not be blank!');
 				email.focus();
 				blank = true;
 			}else if(password.value.trim() == ""){
 				console.log('password = ' + password.value.trim());
 				this._showWarning(true, 'Password should not be blank!');
 				password.focus();
 				blank = true;
 			}
 		}
 		return blank;
 	},
 	_checkEmail : function(loginform){
 		var email = loginform.email.value.trim();
 		if (webchat.util.functions.isEmail(email)) {
 			this._showWarning(false);
 			return true;
 		}else{
 			this._showWarning(true, 'Email is invalid!');
 			return false;
 		} 		
 	},
 	_showWarning : function(display, msg){
 		if(display){
 			$('.loginWarning').text(msg);
 			$('.loginWarning').show();
 		}else{
 			$('.loginWarning').hide();
 		}
 	},
 	_setCookie : function(loginform){
 		var email = loginform.email.value.trim(),
 			keepLogin = loginform.persistent.value;		
 		
		webchat.util.functions.setCookie([{
			c_name : 'email',
			value : email,
		}, {
			c_name : 'keepLogin',
			value : keepLogin

		}], 7);

 	}
 }
