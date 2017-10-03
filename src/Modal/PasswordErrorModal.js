let Modal = require(_.ModalScript);

class PasswordErrorModal extends Modal{
    
    constructor(modalObj){
        super(modalObj);
    }

    /**
    * @param args[0] targetDiv to populate from.
    */ 
    InitializeListeners(args){
        let self = this;
        this._targetDiv = args[0];
        $(this._targetDiv).find("#closeError").click(function(){
            self.HideModal();
        });
    }

}

module.exports = PasswordErrorModal;