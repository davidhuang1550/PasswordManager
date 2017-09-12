let Modal = require(_.path + 'src/Modal/Modal');

class PromptForPassword extends Modal{
    
    constructor(modalObject){
        super(modalObject);
    }

    InitializeListeners(){
        let self = this;
        
        $("#promptForPassword").find("#main-content-close").click(function(){
			self.HideModal();
		});

        $("#secure-content-close").click(function(){
            self.HideModal();
        });
    }
    
}

module.exports = PromptForPassword;