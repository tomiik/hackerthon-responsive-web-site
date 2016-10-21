/*
	Custom Sign-In for TheScholar
*/

/*

var widget_normal,widget_signup;
var onloadCallback = function() {
	widget_normal = grecaptcha.render("normal-recaptcha", {
		'sitekey' : '6Lf7Ph4TAAAAAB02MJfCgZSm4_lw1acNXz1QvF30'
	});
	widget_signup = grecaptcha.render(document.getElementById('signup-recaptcha'), {
		'sitekey' : '6Lf7Ph4TAAAAAB02MJfCgZSm4_lw1acNXz1QvF30'
	});
};

/**/

var validate = function(data) {

	if(data["is-human"] != 1) {
		//grecaptcha.reset(widget_id);
		alert("Please reload and try the captcha again");
	}
	else if(data["valid-user"] != 1) alert("Please login with a registered email");
	else if(data["authentic-user"] != 1) alert("Please check your password");
	else if(data["verified-user"] != 1) alert("Please complete your registration by clicking on the verification link sent to your registered account");
	else {
		$('#login').modal('hide');
		history.go(0);
	}
};

var signup_validate = function(data) {
	if(data["is-human"] != 1) {
		grecaptcha.reset(widget_signup);
		alert("Please reload and try the captcha again");
	}
	else if(data["successful-entry"] != 1) {
		if(data["error"].search(/Duplicate Entry(?=for key 'PRIMARY')/))
			alert("You have already regitered with this e-mail ID\nPlease login with the password sent to your e-mail account");
	}
	else {
		alert("Thank you for signing into TheScholar\nPlease follow the instructions on the e-mail sent your registered e-mail account to complete the registration");
	}
}

$("#custom-login").submit(function(e) {
	e.preventDefault(); // avoid to execute the actual submit of the form

	//var v = verify_captcha(grecaptcha.getResponse(widget_normal));
	//console.log(v);

	var clientData = $("#custom-login").serializeArray();
	$.ajax({
		type: "POST",
		url: "assets/php/login-secure.php",
		data: clientData,
		cache: false,
		dataType: "json",
		success: function(data) {
			console.log(data);
			validate(data);
		},
		failure: function() {
			console.log("Ooops");
		}
	});

});

$("#custom-signup").submit(function(e) {
	e.preventDefault(); // avoid to execute the actual submit of the form.
	
	var clientData = $("#custom-signup").serializeArray();

	$.ajax({
		type: "POST",
		url: "assets/php/signup-secure.php",
		data: clientData,
		cache: false,
		dataType: "json",
		success: function(data) {
			console.log(data);
			signup_validate(data);
		},
		failure: function() {
			console.log("Ooops");
		}
	});

});
