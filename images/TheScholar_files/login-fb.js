/*
	Facebook SignIn for TheScholar
*/

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

var callFbLogin = function(sendData) {
	console.log(sendData);
	$.ajax({
		method: "POST",
		url: "/assets/php/login-social.php",
		data: sendData,
		dataType: "text",
		success: function(data) {
			if(data == "fb-login-successful") {
				console.log("FB-PHP success!!");
				history.go(0);
			} else {
				alert("Unable to process request\nPlease reload the page and try again");
			}
		},
		failure: function() {
			alert("Unable to process request\nPlease check your network connection and try again");
		}
	});
}

// This is called with the results from from FB.getLoginStatus().
var statusChangeCallback = function(response) {
	
	console.log(response);
	console.log('FB - statusChangeCallback');

	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().

	try {
		
		FB.init({
			appId: '582151465282187',
			cookie: true,  // enable cookies to allow the server to access the session
			xfbml: true,  // parse social plugins on this page
			version: 'v2.5' // use graph api version 2.5
		});

		if (response.status === "connected") {
			// Logged into your app and Facebook.
			//testAPI();
			FB.api('/me', function(response) {
				callFbLogin({site: "fb", name: response.name, app_login: false});
			});
	
		} else if (response.status === 'not_authorized' || response.status == 'unknown') {
			// The person is logged into Facebook, but not your app.
			if(response.status == 'not_authorized') {
				document.getElementById('status-fb').innerHTML = 'Please authenticate this app.';
			} else {
				document.getElementById('status-fb').innerHTML = 'Please log into Facebook and refresh the page to log in.';
			}
		
			console.log("FB not-connected says Hello");
			FB.login(function(response) {
				if(response.authResponse) {
					console.log("Facebook Login says Hello");
					FB.api('/me', function(response) {
						callFbLogin({site: "fb", name: response.name, app_login: true});
					});
				}
			});
		}
	} catch(err) {
		alert("Unable to access Facebook API");
		console.log(err);
	}

	
};

// This function is called when someone finishes with the Login Button.  See the onlogin handler attached to it in the sample code below.
var checkLoginState = function() {
	$.ajax({
		url: "assets/php/check-login-mode.php",
		dataType: "json",
		success: function(data) {
			console.log("FB says Hello");

			if(data["login-mode"] == "custom" || data["login-mode"] == "gplus") {
				console.log("FB tried to log you in, but failed");
			}
			else if(data["login-mode"] == "fb")
				console.log("You are already logged in via FB");
			else {
				try {
					FB.init({
						appId: '582151465282187',
						cookie: true,  // enable cookies to allow the server to access the session
						xfbml: true,  // parse social plugins on this page
						version: 'v2.5' // use graph api version 2.5
					});
					FB.getLoginStatus(function(response) {
						console.log(response);
						statusChangeCallback(response);
					});
				} catch(err) {
					alert("Unable to load Facebook API");
				}
			}
		},
		failure: function() {
			console.log("OOPS-FB");
		}
	});
};

window.fbAsyncInit = function() {
	FB.init({
		appId: '582151465282187',
		cookie: true,  // enable cookies to allow the server to access the session
		xfbml: true,  // parse social plugins on this page
		version: 'v2.5' // use graph api version 2.5
	});

	// Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to the callback you provide.  They can be:

	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into your app or not.

	// These three cases are handled in the callback function.
	/*
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	}); /**/
};

var fbSignOut = function() {
	try {
		FB.init({
			appId: '582151465282187',
			cookie: true,  // enable cookies to allow the server to access the session
			xfbml: true,  // parse social plugins on this page
			version: 'v2.5' // use graph api version 2.5
		});
		
		FB.getLoginStatus(function(response) {
			if(response.status == "connected") {
				//console.log("FB Logout says Hello");
				FB.logout();
			}
		});

	} catch(err) {
		alert("Unable to load Facebook API");
		console.log(err);
	}
};