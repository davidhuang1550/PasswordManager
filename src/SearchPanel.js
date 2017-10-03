let PasswordInformationPanel = require(_.PasswordInformationPanelScript),
	Password 			     = require(_.PasswordScript),
	ModalBuilder			 = require(_.ModalBuilder),
	Modal                    = require(_.ModalNames);
class SearchPanel{
	constructor(input, ul , li){
		this._input = input;
		this._ul = ul;
		this._li = li;
		this.PasswordInformationPanel

		this._Passwords = [];
	}

	set Passwords(list){
		this._Passwords = list;
	}

	get Passwords(){
		return this._Passwords;
	}
	// dont need set/get for now

	Filter(){
		let filter = this._input.value.toUpperCase();
		// use a tree structure irl. or a hash map
		// Loop through all list items, and hide those who don't match the search query
		for (let i = 0; i < this._li.length; i++) {
			let a = this._li[i];
			if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
				this._li[i].style.display = "";
			} else {
				this._li[i].style.display = "none";
			}
		}
	}

	LoadPanelContent(){
		let self = this,
			inlinePromise = $.Deferred();
		    firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/passwords').once('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			self._Passwords.push(new Password( childKey,
											   childSnapshot.child('password').val(),
											   childSnapshot.child('secure').val(),
											   childSnapshot.child('keyVal').val(),
											   childSnapshot.child('description').val(),
											   childSnapshot.child('title').val()
											   ));
		  });
		  inlinePromise.resolve();
		});
		return inlinePromise.promise();
		// add listeners then this should invoke the initialize listener function check if the object has been fulfilled so we only need to check once
	}
	
	/**
	*@param the password object 
	*/
	GenerateRightSide(passwordItem){
		let inlinePromise = CommonAjax.GetPartialView(_.rightpanel);

		inlinePromise.done(function(result){
			$("#right-side").html(result);
			// the logic will be changed since htis object will be populated with different data each time so the listeners will be different
			// template should not change
			// decrypt the password first then pass it into here.
			self._oPasswordInformationPanel = new PasswordInformationPanel(passwordItem);

			self._oPasswordInformationPanel.InitializeListeners();
		}).fail(function(){
			console.log("fail downloading");
		});
	}
	
	OnChildAdded(){
		let self = this,
			skipOne = false;
		firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/passwords').limitToLast(1).on("child_changed", function(snapshot, prevChildKey){
			let password = snapshot.val(),
				updateToexsisting = undefined,
				newPassword;
			if(skipOne){
				for(var x = 0; x<self._Passwords.length ; x++){
					if(password.key == self._Passwords[x].key) updateToexsisting = x;
				}
				newPassword = new Password( password.key,
												   password.password,
											       password.secure,
											       password.keyVal,
												   password.description,
												   password.title
													   );
				if(updateToexsisting === undefined){
					self._Passwords.push(newPassword);
					self.AddRow(password, self._Passwords.length -1);
				} else {
					self._Passwords[updateToexsisting] = newPassword;
				}
			} else{
				skipOne = true;
			}
		});
	}

	/**
	*@param password object specifically for secure and title
	*@param counter to uniquely identify each row.
	**/
	AddRow(password, x) {
		let secureIcon;
		if(x == 0) {
			secureIcon = (password.secure) ? '<i class="fa fa-lock" aria-hidden="true" style="float:right;padding-top:2px;"></i>' :"" ;
			$("#ulId").append('<li class="list-group-item" style="border:0 none;" id="' + 0 + '">' + secureIcon +
			password.title + '</li>');
		} else {
			let secureIcon = (password.secure) ? '<i class="fa fa-lock" aria-hidden="true" style="float:right;padding-top:2px;"></i>' :"" ;
			$("#ulId").append('<li class="list-group-item" id="' + x + '">' + secureIcon + password.title + '</li>');

		}
	}


	InitializeListeners(){
		// this goes here for now but should be invoked once a item is selected and should only be invoked once ine the lifespan of the program
		let self = this,
			inlinePromise = self.LoadPanelContent(),
			promptForPassword,
 			mBuilder = new ModalBuilder();

		inlinePromise.done(function(){
			let passwordLength;
			for(let x = 0,passwordLength = self._Passwords.length; x<passwordLength; x++){
				self.AddRow(self._Passwords[x],x);
			}
			self.OnChildAdded();
			self._li = self._ul.getElementsByTagName('li');
			$("#loading-component").remove();
			$("#main-content").removeClass('main-content-blur');
		}).fail(function(){

		});


		$("#ulId").on('click','li', function(){
			let passwordItem = self._Passwords[parseInt($(this).attr("id"))],
				inlinePromise; //gets the text value
			if(passwordItem._secure) {

				inlinePromise = mBuilder.CreateModal('promptForPassword', Modal.PromptForPassword, 'promptForPassword', _.PromptForPassword);
				inlinePromise.done(function(result){
					let passwordPromise;
					if(result !== undefined){
						promptForPassword = result;
						passwordPromise = promptForPassword.ShowModal();
						passwordPromise.done(function(){
							self.GenerateRightSide(passwordItem);
						}).fail(function(reason){

						});
					}
				}).fail(function(){
					console.log("cannot fetch prompt for password modal");
				});
			} else {
				self.GenerateRightSide(passwordItem);
			}

		});
	}
}

module.exports = SearchPanel;
