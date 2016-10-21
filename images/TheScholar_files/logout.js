var callLogout = function() {
	$.ajax({
		url: "assets/php/logout.php",
		success: function() {
			history.go(0);
		},
		failure: function() {
			console.log("Oops - Logout");
		}
	});
}

var logout = function () {
	console.log("Logout - Hello");

	$.ajax({
		url: "assets/php/check-login-mode.php",
		dataType: "json",
		success: function(data) {
			console.log(data);
			if(data["app_login"] == true || data["app_login"] == "true") {
				if(data["login-mode"] == "fb")
					fbSignOut();
				else if(data["login-mode"] == "gplus")
					gplusSignOut();
			}
			callLogout();
		},
		failure: function() {
			console.log("Oops - Logout");
		}
	});
};