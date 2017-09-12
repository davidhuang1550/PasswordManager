let PasswordInformationPanel = require(_.path + 'src/PasswordInformationPanel'),
	Password 			     = require(_.path + 'src/models/Password'),
	ModalBuilder			 = require(_.path + 'src/Modal/ModalBuilder'),
	Modal                    = require(_.path + 'src/ModalNames');
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

	InitializeListeners(){
		// this goes here for now but should be invoked once a item is selected and should only be invoked once ine the lifespan of the program
		let self = this,
			inlinePromise = self.LoadPanelContent(),
			promptForPassword,
 			mBuilder = new ModalBuilder();

		inlinePromise.done(function(){
			if(self._Passwords[0] != null){
				let secureIcon = (self._Passwords[0].secure) ? '<i class="fa fa-lock" aria-hidden="true" style="float:right;padding-top:2px;"></i>' :"" ;
				$("#ulId").append('<li class="list-group-item" style="border:0 none;" id="' + 0 + '">' + secureIcon +
				self._Passwords[0].title + '</li>');
			}
			for(let x = 1; x <self._Passwords.length; x++){
				let secureIcon = (self._Passwords[x].secure) ? '<i class="fa fa-lock" aria-hidden="true" style="float:right;padding-top:2px;"></i>' :"" ;
				$("#ulId").append('<li class="list-group-item" id="' + x + '">' + secureIcon +
				self._Passwords[x].title + '</li>');
			}

			self._li = self._ul.getElementsByTagName('li');
			$("#loading-component").remove();
		}).fail(function(){

		});


		$("#ulId").on('click','li', function(){
			let passwordItem = self._Passwords[parseInt($(this).attr("id"))],
				inlinePromise; //gets the text value
			if(passwordItem._secure) {

				inlinePromise = mBuilder.CreateModal('promptForPassword', Modal.PromptForPassword, 'promptForPassword', _.PromptForPassword);
				inlinePromise.done(function(result){
					if(result !== undefined){
						promptForPassword = result;
						promptForPassword.ShowModal();
					}
				}).fail(function(){

				});
			} else {
				self.GenerateRightSide(passwordItem);
			}

		});
	}
}

module.exports = SearchPanel;
