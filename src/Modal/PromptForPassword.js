let Modal = require(_.ModalScript),
    Hash  = require(_.HashFunction);

class PromptForPassword extends Modal{
    
    constructor(modalObject){
        super(modalObject);
        this.inlinePromise = new $.Deferred();
    }

    ShowModal(){
        this._modal.style.display = "block";
        return this.inlinePromise.promise();
    }
    InitializeListeners(){
        let self = this;
        //promptForPasswordInput
        //accessPasswordProfileButton
        $("#promptForPassword").find("#main-content-close").click(function(){
            self.inlinePromise.reject();
			self.HideModal();
		});

        $("#secure-content-close").click(function(){
            self.inlinePromise.reject();
            self.HideModal();
        });

        $("#promptForPasswordInput").keyup(function(e){
            if($("#accessPasswordProfileButton").val().length == 0){
                $("#accessPasswordProfileButton").removeClass("disabled");
            } else {
                $("#accessPasswordProfileButton").addClass("disabled");
            }
        });

        $('#accessPasswordProfileButton').click(function(){
            let passwordVal = $('#promptForPasswordInput').val();
            if(passwordVal.length > 0){
            	firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/MasterPassword').once('value', function(snapshot) {
                    let password = snapshot.val();
                    if( password.master === Hash(passwordVal + password.salt)){
                        self.HideModal();
                        self.inlinePromise.resolve();
                    } else {
                        $("#InvalidMasterPassword").removeAttr('hidden');
                    }
                }); 
            }
        });
    }
    
}

module.exports = PromptForPassword;