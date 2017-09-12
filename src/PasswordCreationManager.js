let GeneratePassword = require(_.path + 'src/GeneratePassword'),
	WordGenerate     = require(_.path + 'src/WordGenerate'),
	ModalBuilder	 = require(_.path + 'src/Modal/ModalBuilder'),
	Modal			 = require(_.path + 'src/ModalNames');

class PasswordCreationManager{
	constructor(targetDiv){
		this._passwordCache = [];
		this._historyCounter = 0;
		this._keyCount = 0;
		this._valueCount = 0;
		this._GeneratePassword = new GeneratePassword();
		this._lowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		this._upperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		this._symbol = ['!','@','#','$','%','^','&','*','-','+'];
		this._number = [0,1,2,3,4,5,6,7,8,9];
		this._targetDiv = targetDiv;
		this._errorModal;
		
	}

	set targetDiv(target){
		this._targetDiv = targetDiv;
	}

	get targetDiv(){
		return this._targetDiv;
	}

	CreatePassword(){
		let args = [],
			counter = 0,
			passwordLength = 0,
			password,
			mBuilder,
			self = this;

		passwordLength = $(this._targetDiv).find("#passwordLength").val();
		if($(this._targetDiv).find("#onlyEnglishWords").prop("checked")){
			if($(this._targetDiv).find("#passwordLength").val() >= 6 && $(this._targetDiv).find("#passwordLength").val() <= 20){
				if(allLoaded){
					this._WordGenerate = new WordGenerate(csv[0],csv[1],csv[2],csv[3],csv[4]);
					password = this._WordGenerate.FasterCreate(passwordLength);
					$(this._targetDiv).find("#generatedPassword").val(password);
					if(this._passwordCache  > 19 ) this._passwordCache.shift();
					this._passwordCache .push(password);
				}
			}
		} else {
			if($(this._targetDiv).find("#lowerCase").hasClass("selected")){
				args.push(this._lowerCase);
			}
			if($(this._targetDiv).find("#upperCase").hasClass("selected")){
				args.push(this._upperCase);
			}

			if($(this._targetDiv).find("#symbols").hasClass("selected")){
				args.push(this._symbol);
			}

			if($(this._targetDiv).find("#numbers").hasClass("selected")){
				args.push(this._number);
			}

			if(args.length > 0 && ($(this._targetDiv).find("#passwordLength").val() >= 6 && $(this._targetDiv).find("#passwordLength").val() <= 20)){
				password = this._GeneratePassword.Generate(passwordLength, args);
				$(this._targetDiv).find("#generatedPassword").val(password);
				if(this._passwordCache  > 19 ) this._passwordCache.shift();
				this._passwordCache .push(password);
			} else {
				let inlinePromise;
				mBuilder = new ModalBuilder();
				inlinePromise = mBuilder.CreateModal('errorModal', Modal.PasswordErrorModal, 'errorModal', _.PasswordErrorModal);
				inlinePromise.done(function(result){
					if(result !== undefined){
						self._errorModal = result;
						self._errorModal.InitializeListeners(self._targetDiv);
						self._errorModal.ShowModal();
					}
				}).fail(function(){

				});
			}
		}
	}

	onClickCopyCache(id){
		$(this._targetDiv).find("#generatedPassword").val($(this._targetDiv).find("#"+id).val());
		var modal = $(this._targetDiv).find('#historyModal').css("display","none");

	}

	OnlyEnglishWords(){
		if($(this._targetDiv).find("#onlyEnglishWords").prop("checked")){
			$(this._targetDiv).find("#lowerCase").addClass("disabled");
			$(this._targetDiv).find("#upperCase").addClass("disabled");
			$(this._targetDiv).find("#symbols").addClass("disabled");
			$(this._targetDiv).find("#numbers").addClass("disabled");
		} else {
			$(this._targetDiv).find("#lowerCase").removeClass("disabled");
			$(this._targetDiv).find("#upperCase").removeClass("disabled");
			$(this._targetDiv).find("#symbols").removeClass("disabled");
			$(this._targetDiv).find("#numbers").removeClass("disabled");
		}

	}

	ResetFields(){
		$(this._targetDiv).find("#lowerCase").removeClass("selected");
		$(this._targetDiv).find("#upperCase").removeClass("selected");
		$(this._targetDiv).find("#symbols").removeClass("selected");
		$(this._targetDiv).find("#numbers").removeClass("selected");
		$(this._targetDiv).find("#generatedPassword").val("");
		$("#AdditionalInformationBtn").addClass("disabled");
	}

	PopulateHistory(){
		let self = this;
		for (let i = self._historyCounter ; i < self._passwordCache.length ; i++){
			$(self._targetDiv).find("#modal-content-div").append(
					'<div class="input-group" style="width:450px;margin-left:auto;margin-right:auto;margin-top:20px;margin-bottom:20px;">'+
						'<input type="text" class="form-control"' +
						'id="generatedPassword' + i + '" value = "' + self._passwordCache[i] + '"  readonly/>'+
						'<span class="input-group-addon cache-selector" id="copy-clipboard' + i + '"><i class="fa fa-mouse-pointer" aria-hidden="true"></i></span>'+
					'</div>');
			self._historyCounter++;
			$(self._targetDiv).find("#copy-clipboard"+i).click(function(){
				self.onClickCopyCache("generatedPassword" +i);
			});
		}
	}

	InitializeListeners(){
		let self = this,
			historyModal,
			mBuilder = new ModalBuilder();


		$(this._targetDiv).find("#show-history").click(function(){
			if(historyModal !== undefined){
				self.PopulateHistory()
				historyModal.ShowModal();
			} else {
				let inlinePromise;
				inlinePromise = mBuilder.CreateModal('historyModal', Modal.HistoryModal, 'historyModal', _.HistoryModal);
				inlinePromise.done(function(result){
					if(result !== undefined){
						historyModal = result;
						historyModal.InitializeListeners(self._targetDiv);
						self.PopulateHistory();
						historyModal.ShowModal();
					}
				}).fail(function(){

				});
			}
		});

		$(this._targetDiv).find("#CreatePasswordBtn").click(function(){
			self.CreatePassword();
			$("#AdditionalInformationBtn").removeClass("disabled");
		});


		$(this._targetDiv).find("#copy-clipboard").click(function(){
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val($(self._targetDiv).find('#generatedPassword').val()).select();
			document.execCommand("copy");
			$temp.remove();

			// Get the snackbar DIV
			var x = document.getElementById("snackbar");

			// Add the "show" class to DIV
			x.className = "show";

			// After 3 seconds, remove the show class from DIV
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		});

		$(this._targetDiv).find("#onlyEnglishWords").click(function(){
			self.OnlyEnglishWords();
		});

		$(this._targetDiv).find(".list-group-item-password").click(function(){
			let current = $(this);
			if(current.hasClass("selected")){
				current.removeClass("selected")
			} else {
				current.addClass("selected")
			}
		});


	}

};

module.exports = PasswordCreationManager;
