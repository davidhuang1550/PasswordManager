
class Login{

	constructor(){

	}

	checkFields(){
		if( $("#Username").val().length > 0 &&  $("#Password").val().length > 0){
			$("#login-button").removeClass("disabled");
		} else {
			$("#login-button").addClass("disabled");
		}
	}

	authenticate(email, password){
		let inlinePromise = $.Deferred();
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
			inlinePromise.resolve();
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
			inlinePromise.reject();
		});
		return inlinePromise.promise();
	}

	InitializeListeners(){
		let self = this;

		$("#Username").keyup("input", function(){
			self.checkFields();
		});
		$("#Password").keyup("input", function(){
			self.checkFields();
		});
		$("#login-button").click(function(){
					self.SignIn();
		});
		$(document).keyup(function(e){
				if(e.keyCode == 13) {
					self.SignIn();
				}
		})

		$("#acctioncreate-button").click(function(){
			$("#login-container").addClass("display-none");
			if($("#signupcontainer").length){
					$("#signupcontainer").removeClass("display-none");
			} else {
					route(_.signup);
			}
		});
	}

	SignIn(){
		let username = $("#Username").val(),
				password = $("#Password").val(),
				modal = document.getElementById('loginModal'),
				self = this;
		if( username.length > 0 &&  password.length > 0){
			modal.style.display = "block";
			let success = self.authenticate(username,password);
			success.done(function(){
				route(_.overview);
			}).fail(function(){
				modal.style.display = "none";
				$("#InvalidCred").removeAttr('hidden');
				console.log("wrong user and pass");
			});

		}
	}

}


module.exports =  new Login();
