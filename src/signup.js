
let Hash = require(_.HashFunction);
const crypto = require('crypto');
class SignUp{

  constructor(){

  }

  /**
   *@param email address of user
   *@param password of user
   **/
  createAccount(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
        let buf = crypto.randomBytes(16).toString('hex');
        let masterPassword = Hash(password + buf);
        let userRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid +'/MasterPassword');
        userRef.set({
          master : masterPassword,
          salt : buf
        });
    }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });

  }
  /**
   *@param email address that needs to validated for valid email address
   */
  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  InitializeListeners(){
    let self = this;
    $("#back-to-login").click(function(){
      $("#login-container").removeClass("display-none");
      $("#signupcontainer").addClass("display-none")
    });

    $("#createAccount").click(function(){
      let username = $("#usernameSignUp").val(),
          password = $("#firstPassword").val(),
          confirmpassword = $("#confirmPassword").val();
      if(self.validateEmail(username) && (confirmpassword == password) && self.validatePassword(password)){
        self.createAccount(username, password);
        $("#login-container").removeClass("display-none");
        $("#signupcontainer").addClass("display-none")
      }
    });

    $("#firstPassword").keyup(function(e){
        self.validateBothpasswords();
    });


    $("#confirmPassword").keyup(function(e){
        self.validateBothpasswords();
    });


  }

  validateBothpasswords(){
    let password = $("#firstPassword").val(),
        confirmpassword = $("#confirmPassword").val();

    if(password !== confirmpassword){
      $("#confirmPasswordLabel").html("Password does not match")
    } else {
      $("#confirmPasswordLabel").html("");
    }
  }

  validatePassword(password){
    var upperCase= new RegExp('[A-Z]','g');
    var lowerCase= new RegExp('[a-z]','g');
    var numbers = new RegExp('[0-9]','g');
    var symbols = new RegExp('[~!@#$%^&*-]','g');

    return (password.match(upperCase) && password.match(lowerCase) && password.match(numbers) && password.match(symbols)) ? true : false;

  }
}

module.exports = new SignUp();
