/**
 * @author waouyang
 */

webchat.util.functions = {
	isEmail : function(email){
		var emailPat = /^(.+)@(.+)$/;
		var matchArray = email.match(emailPat);
		if (matchArray == null) {
			return false;
		}
		return true;
	},	
	getCookie : function(c_name) {
		if(document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if(c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if(c_end == -1)
					c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	},	

	setCookie : function(cookieData, expiredays){
		var cookie = "",
			exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		
		for(var item in cookieData){
			cookie = cookieData[item].c_name + "=" + escape(cookieData[item].value);
			cookie = cookie + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());		
			document.cookie = cookie;
		};
	}
}
