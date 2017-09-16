let  AdditonalInformation = require(_.path + 'src/AdditionalInformation'),
     Modal                = require(_.path + 'src/Modal/Modal');

class PasswordCreationModal extends Modal {

    /**
    *@param modalObject modal object passed usually by the builder object;
    */
    constructor(modalObject){
        super(modalObject);
        this._oAdditonalInformation;
    }

    InitializeListeners(){
        let self = this;

        this._oAdditonalInformation = new AdditonalInformation("#myModal");


        $(document).keyup(function(e) {
			 if (e.keyCode == 27) { // escape key maps to keycode `27`
				self.HideModal();
			}
		});

		$("#myModal").find("#main-content-close").click(function(){
			self.HideModal();
		});

        $("#AdditionalInformationBtn").click(function(){
            if($("#generatedPassword").val().length >0){
                let inlinePromise = self._oAdditonalInformation.InitializeListeners();

                inlinePromise.done(function(){
                    //    self._oPasswordCreationManager.ResetFields();
                        self.HideModal();
                }).fail(function(){

                });
            }
        });

    }

}

module.exports =  PasswordCreationModal;