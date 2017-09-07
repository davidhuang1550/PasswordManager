
 let PasswordCreationManager  = require(_.path + 'src/PasswordCreationManager');
 class PasswordInformationPanel{

 	constructor(pass){
 		this._PasswordCreationManager;
 		this._password = pass;
 	}

 	EditMode(){

 		if($("#editmode").hasClass("fa-floppy-o")){
 			// obviously do validation before saving anything
 			$("#editmode").removeClass("fa-floppy-o");
 			$("#editmode").addClass("fa-pencil");
 			$(".form-control-editable").attr("readonly",true);
 			$("#change-password").addClass("hidden");

 		} else {
 			$("#editmode").removeClass("fa-pencil");
 			$("#editmode").addClass("fa-floppy-o");
 			$(".form-control-editable").attr("readonly",false);
 			$("#change-password").removeClass("hidden");
 		}
 	}

 	SetView(){
		let self = this;
 		$(".right-panel").find("#title").html(this._password.title);
 		if(this._password._secure){
 			$("#right-panel").find("#security").removeClass("label-danger");
 			$("#right-panel").find("#security").addClass("label-success");
 			$("#right-panel").find("#security").html("Secure");
 		} else {
 			$("#right-panel").find("#security").removeClass("label-success");
 			$("#right-panel").find("#security").addClass("label-danger");
 			$("#right-panel").find("#security").html("Not Secure");
 		}
 		$("#right-panel").find("#description").html(this._password.description);
		$.ajax({
		  url: "https://us-central1-passwordmanager-86755.cloudfunctions.net/decrypt",
		  type: "POST",
		  data: {"hash": self._password._password},
		  dataType: "text",
		  success: function(response){
				self._password._password = response;
		   // console.log(response);

		  },
		  error: function(error){
		    console.log(error);
		  }
		});

 		for(let x = 0; x < this._password.keyVal ; x++){
 			$("#right-panel").find("key-value-container").append(
 				'<div class="row" style="margin-top:10px;">'+
 					'<div class="col-xs-3">'+
 						'<input class="form-control form-control-editable" type="text" id="' + x + '" value="' + Object.keys(this.password.keyVal)[x] + '" readonly/>'+
 					'</div>'+
 					'<div class="col-xs-9">'+
 						'<input class="form-control form-control-editable" id="' + x + '" type="text" value="' + this.password.keyVal[Object.keys(this.password.keyVal)[x]] + '" readonly/>'+
 					'</div>'+
 				'</div>'
 			);
 		}
 	}

 	InitializeListeners(){
 		// this page should be blank and loaded in with ajax then manipulated with data each time
 		let self = this;
 		$("#editmode").click(function(){
 			self.EditMode();
 		});
		self.SetView();
 		$("#change-password").click(function(){
 			let inlinePromise = CommonAjax.GetPartialView(_.passwordchange);
 			inlinePromise.done(function(result){
 				$("#modal-container").append(result);
 				self._PasswordCreationManager = new PasswordCreationManager("#modal-container");
 				self._PasswordCreationManager.InitializeListeners();

 				let modal = document.getElementById('passwordChangeModal');

 				modal.style.display = "block";

 				$("#right-panel").find("#main-content-close").click(function(){
 					modal.style.display = "none";
 					$("#modal-container").empty();
				});

 			});
 			// renenter master password then prompt to changing modal
 	});
 		$("#show-password-single").click(function() {
 			if ($('#invidiualPassword').get(0).type == 'password'){
 				$('#invidiualPassword').val(self._password._password);
 				$('#invidiualPassword').get(0).type = 'text';
 			}
 			else {
 				$('#invidiualPassword').get(0).type = 'password';
 				$('#invidiualPassword').val("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
 			}
 		});

 		$("#copy-clipboard-single").click(function(){
 			   var $temp = $("<input>");
 			   $("body").append($temp);
 			   $temp.val(self._password._password).select();
 			   document.execCommand("copy");
 			   $temp.remove();

 				// Get the snackbar DIV
 				var x = document.getElementById("snackbar")

 				// Add the "show" class to DIV
 				x.className = "show";

 				// After 3 seconds, remove the show class from DIV
 				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 		});



 	}
 };

 module.exports = PasswordInformationPanel;
