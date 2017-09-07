let SearchPanel 			 = require(_.path + 'src/SearchPanel'),
	PasswordCreationManager  = require(_.path + 'src/PasswordCreationManager'),
	AdditonalInformation	 = require(_.path + 'src/AdditionalInformation');

class Overview{
	constructor(){
		this._oSearchPanelFilter,
		this._oPasswordCreationManager;
		this._oAdditonalInformation;
		this._modal;
	}

	InitializeSearchFilter(){
		let input = document.getElementById('searchInput'),
			ul = document.getElementById("ulId");

		this._oSearchPanelFilter = new SearchPanel(input,ul);
		this._oSearchPanelFilter.InitializeListeners();
	}

	HideModal(){
			this._modal.style.display = "none";
	}

	InitializeListeners(){
		let self = this;
		this._modal = document.getElementById('myModal');
		this.InitializeSearchFilter();

		this._oPasswordCreationManager = new PasswordCreationManager("#myModal");
		this._oAdditonalInformation = new AdditonalInformation("#myModal");

		this._oPasswordCreationManager.InitializeListeners();


		$(document).keyup(function(e) {
			 if (e.keyCode == 27) { // escape key maps to keycode `27`
				self._modal.style.display = "none";
			}
		});

		$("#searchInput").keyup(function(e){
			self._oSearchPanelFilter.Filter();
		});

		$("#add").click(function(){
			self._modal.style.display = "block";
		});

		$("#myModal").find("#main-content-close").click(function(){
			self._modal.style.display = "none";
		});


		$("#AdditionalInformationBtn").click(function(){
			if($("#generatedPassword").val().length >0){
				let inlinePromise = self._oAdditonalInformation.InitializeListeners();

				inlinePromise.done(function(){
						self._oPasswordCreationManager.ResetFields();
						self._modal.style.display = "none";
				}).fail(function(){

				});
			}
		});


	}
}

module.exports  = Overview;
