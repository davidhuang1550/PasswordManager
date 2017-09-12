let ModalBuilder = require(_.path + 'src/Modal/ModalBuilder'),
	Modal		 = require(_.path + 'src/Modal/Modal');

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

	/**
	*@param email the email address of the account
	*@param password the password of of the account
	*/
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
			loginModal,
			self = this,
			mBuilder = new ModalBuilder(),
			inlinePromise,
			SucessPromise;
	
		if( username.length > 0 &&  password.length > 0){
			inlinePromise = mBuilder.CreateModal('loginModal', Modal.LoginModal, 'loginModal', _.LoginModal);
			inlinePromise.done(function(result){
				if(result !== undefined){
					loginModal = result;
					loginModal.ShowModal();
				}
			}).fail(function(){

			});
			SucessPromise = self.authenticate(username,password);
			SucessPromise.done(function(){
				route(_.overview);
			}).fail(function(){
				loginModal.HideModal();
				$("#InvalidCred").removeAttr('hidden');
				console.log("wrong user and pass");
			});

		}
	}

}


module.exports =  new Login();
