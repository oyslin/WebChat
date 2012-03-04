
var webchat = {
	version : "0.1",
	buildNum : "",
	login : {},
	util : {},
	interfaces : {},
	services : {},
	sockets : {},
	
	config : {
		
	},
	
	startup : function(){
		var email = webchat.util.functions.getCookie('email');
		var keepLogin = webchat.util.functions.getCookie('keepLogin');
		if(email != null && email != ""){
			$('#login_form input[name="email"]').val(email);
		}
		if(keepLogin != null && keepLogin != "" && keepLogin != 0){
			$('#login_form :checkbox').attr('checked', true);
		}
	}
}