class AdditionalInformation{

	constructor(targetDiv){
		this._keyCount = 0;
		this.valueCount = 0;
		this._targetDiv = targetDiv;
	}

	set targetDiv(target){
		this._targetDiv = target;
	}

	get targetDiv(){
		return this._targetDiv;
	}

	BackToCreatePassword(){
		//$("#generatedPassword").addClass("form-control");
		var additionalModal = document.getElementById('additional-info');
	   // mainModal.style.display = "none";
		additionalModal.style.display = "none";
	}

	AddKeyValue(){

		$("#key_value_container").append('<div class="row" style="margin-top:10px;">'+
								'<div class="col-xs-3">'+
									'<input class="form-control" type="text" placeholder="Key" id="key' + this._keyCount + '" />'+
								'</div>'+
								'<div class="col-xs-9">'+
									'<input class="form-control" type="text" placeholder="Value" id="value' + this._valueCount + '" />'+
								'</div>'+
							'</div>');
		this._keyCount++;
		this._valueCount++;
	}

	ResetFields(){
		$("#additional-info").find("#additioanlPassword").text("");
		$("#additional-info").find("#description").val("");
		$("#additional-info").find("#title").val("");
	}

	InitializeListeners(){
		//$("#generatedPassword").removeClass("form-control");
		let self = this,
			additionalModal = document.getElementById('additional-info'),
			inlinePromise = $.Deferred();

	   // mainModal.style.display = "none";
		additionalModal.style.display = "block";
		$("#additional-info").find("#additioanlPassword").html($(this._targetDiv).find("#generatedPassword").val());

		if($(this._targetDiv).find("#secure").hasClass("selected")){
			$("#additional-info").find("#security").removeClass("label-danger");
			$("#additional-info").find("#security").addClass("label-success");
			$("#additional-info").find("#security").html("Secure");
		} else {
			$("#additional-info").find("#security").removeClass("label-success");
			$("#additional-info").find("#security").addClass("label-danger");
			$("#additional-info").find("#security").html("Not Secure");
		}

		$("#additional-info").find("#backToCreatePassword").click(function(){
			self.BackToCreatePassword();
		});

		$("#additional-info").find("#AddKeyValue").click(function(){
			self.AddKeyValue();
		});

		$("#CreateNewpassword").click(function(){
			let modal = document.getElementById('creatingPasswordModal');
			let user = firebase.auth().currentUser.uid;
			let keyValueObj = {};
			let secureVal = $("#additional-info").find("#security").hasClass('label-success');
			modal.style.display = "block";

			for(let x = 0 ; x < self._keyCount; x++){
				keyValueObj[$(self._targetDiv).find("#key" +x).val()] = $(self._targetDiv).find("#value" +x).val();
			}

			let postRef = firebase.database().ref(('users/'+user+'/passwords')).push();

			postRef.set({
			  temppassword: $("#additional-info").find("#additioanlPassword").text(),
				description: $("#additional-info").find("#description").val(),
				title: $("#additional-info").find("#title").val(),
				secure: secureVal
			});
			modal.style.display = "none";
			additionalModal.style.display = "none";
			self.ResetFields();
			inlinePromise.resolve();
		});
		return inlinePromise.promise();
	}

};

module.exports = AdditionalInformation;
