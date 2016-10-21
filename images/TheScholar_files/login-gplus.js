/*
	Google+ Sign-In for TheScholar
*/

window.onLoadCallback = function() {
	auth2 = gapi.auth2.init({
		client_id: '428313558433-f7vdbkqjp8tdtul4buq2e96skue75tc1.apps.googleusercontent.com',
		fetch_basic_profile: true,
		scope: 'profile',
		cookie_policy: 'single_host_origin'
	});
};


var callGplusLogin = function(sendData) {
	$.ajax({
		method: "POST",
		url: "assets/php/login-social.php",
		data: sendData,
		dataType: "text",
		success: function(data) {
			if(data == "gplus-login-successful") {
				console.log("gplus-PHP Successful!!");
				history.go(0);
			}
		},
		failure: function() {
			console.log("OOPS-Gplus");
		}
	});
};

var gplusOAuthSignIn = function() {
	try {
		auth2 = gapi.auth2.init({
			client_id: '428313558433-f7vdbkqjp8tdtul4buq2e96skue75tc1.apps.googleusercontent.com',
			fetch_basic_profile: true,
			scope: 'profile',
			cookie_policy: 'single_host_origin'
		});

		// Sign the user in, and then retrieve their ID.
		if(auth2.isSignedIn.get()) {
			var profile = auth2.currentUser.get().getBasicProfile();
			callGplusLogin({site: "gplus", name: profile.getName(), app_login: false });
		}

		else {
			auth2.signIn().then(function() {
				var profile = auth2.currentUser.get().getBasicProfile();
				//console.log('Full Name: ' + profile.getName());
				/*
				console.log('ID: ' + profile.getId());
				console.log('Given Name: ' + profile.getGivenName());
				console.log('Family Name: ' + profile.getFamilyName());
				console.log('Image URL: ' + profile.getImageUrl());
				console.log('Email: ' + profile.getEmail()); /**/
				//document.getElementById('status-g+').innerHTML = 'Thanks for logging in via G-Mail, ' + profile.getName() + '!';
				console.log("G+ SignIn says Hello");

				callGplusLogin({site: "gplus", name: profile.getName(), app_login: true });
			});
		}

	} catch(err) {
		alert("Unable to load Google+ OAuth API");
		console.log(err);
	}
};

var gplusSignIn = function() {
	try {
		gapi.load('auth2', gplusOAuthSignIn);
	} catch(err) {
		console.log(err);
		alert("Unable to load Google+ API");
	}
};

var checkLoginStat = function() {

	console.log("GPlus says Hello");
	
	$.ajax({
		url: "assets/php/check-login-mode.php",
		dataType: "json",
		success: function(data) {

			if(data["login-mode"] == "custom" || data["login-mode"] == "fb") {
				console.log("FB tried to log you in, but failed");
			}
			else if(data["login-mode"] == "gplus")
				console.log("You are already logged in via Gplus");
			else {
				gplusSignIn();
			}
		},
		failure: function() {
			console.log("OOPS-FB");
		}
	});

};

var gplusOAuthSignOut = function() {
	try {
		auth2 = gapi.auth2.init({
			client_id: '428313558433-f7vdbkqjp8tdtul4buq2e96skue75tc1.apps.googleusercontent.com',
			fetch_basic_profile: true,
			scope: 'profile',
			cookie_policy: 'single_host_origin'
		});

		auth2.signOut();

	} catch(err) {
		alert("Unable to load Google+ OAuth API");
		console.log(err);
	}
};

var gplusSignOut = function() {
	try {
		gapi.load('auth2', gplusOAuthSignOut);
	} catch(err) {
		alert("Unable to load Google+ API");
		console.log(err);
	}
};
