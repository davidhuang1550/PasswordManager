let SearchPanel 			 = require(_.path + 'src/SearchPanel'),
	PasswordCreationManager  = require(_.path + 'src/PasswordCreationManager'),
	ModalBuilder			 = require(_.path + 'src/Modal/ModalBuilder'),
	Modal                    = require(_.path + 'src/ModalNames');

class Overview{
	constructor(){
		this._oSearchPanelFilter,
		this._oPasswordCreationManager;
		this._modal;
	}

	InitializeSearchFilter(){
		let input = document.getElementById('searchInput'),
			ul = document.getElementById("ulId");

		this._oSearchPanelFilter = new SearchPanel(input,ul);
		this._oSearchPanelFilter.InitializeListeners();
	}

	HideModal(){
		self._modal.HideModal();
	}

	InitializeListeners(){
		let self = this,
			mBuilder = new ModalBuilder(),
			inlinePromise;
		this.InitializeSearchFilter();

		
		$("#searchInput").keyup(function(e){
			self._oSearchPanelFilter.Filter();
		});

		$("#add").click(function(){
			inlinePromise = mBuilder.CreateModal('myModal',Modal.PasswordModal, 'PasswordCreationModal', _.PasswordCreationModal);
			inlinePromise.done(function(result){
				self._modal = result;
				if(self._modal !== undefined){
					self._modal.ShowModal();
					self._oPasswordCreationManager = new PasswordCreationManager("#myModal");
					self._oPasswordCreationManager.InitializeListeners();
				}
			}).fail(function(){

			});
		});
	}
}

module.exports  = Overview;
