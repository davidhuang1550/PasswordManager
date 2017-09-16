let Modal = require(_.path + 'src/Modal/Modal'),
    Hash  = require(_.path + 'src/models/HashFunction');

class PromptForPassword extends Modal{
    
    constructor(modalObject){
        super(modalObject);
    }

    InitializeListeners(){
        let self = this;
        //promptForPasswordInput
        //accessPasswordProfileButton
        $("#promptForPassword").find("#main-content-close").click(function(){
			self.HideModal();
		});

        $("#secure-content-close").click(function(){
            self.HideModal();
        });

        $('#accessPasswordProfileButton').click(function(){
            let passwordVal = $('#promptForPasswordInput').val();
            if(passwordVal.length > 0){
            	firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/masterPassword').once('value', function(snapshot) {
                    if(snapshot.val() === Hash(passwordVal)){
                        
                    }
                }); 
            }
        });
    }
    
}

module.exports = PromptForPassword;