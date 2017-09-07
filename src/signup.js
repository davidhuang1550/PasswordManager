
require(_.path + 'src/models/HashFunction');
const crypto = require('crypto');
class SignUp{

  constructor(){

  }

  createAccount(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      let buf = crypto.randomBytes(16).toString('hex');
      let masterPassword = Hash(password + buf);
      let userRef = firebase.database().ref('users/' + firebase.database firebase.auth().currentUser.uid);
      userRef.set({
        master : masterPassword,
        salt : buf
      });
      // ...
    });

  }

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
          password = $("#Password").val(),
          confirmpassword = $("#confirmPassword").val();
        console.log(self.validateEmail(username));
        console.log(self.validatePassword(password));
      if(self.validateEmail(username) && (confirmpassword == password) && self.validatePassword(password)){
        self.createAccount(username, password);
        $("#login-container").removeClass("display-none");
        $("#signupcontainer").addClass("display-none")
      }
    });

    $("#confirmPassword").keyup(function(e){
        self.validateBothpasswords();
    });

    $("#Password").keyup(function(e){
        self.validateBothpasswords();
    });

  }

  validateBothpasswords(){
    let password = $("#Password").val(),
        confirmpassword = $("#confirmPassword").val();

    if(password != confirmpassword){
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
    console.log(password.match(symbols));
    console.log(password.match(numbers));
    console.log(password.match(lowerCase));
    console.log(password.match(upperCase));
    return (password.match(upperCase) && password.match(lowerCase) && password.match(numbers) && password.match(symbols)) ? true : false;

  }
}

module.exports = new SignUp();
