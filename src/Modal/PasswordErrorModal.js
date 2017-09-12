let Modal = require(_.path + 'src/Modal/Modal');

class PasswordErrorModal extends Modal{
    
    constructor(modalObj){
        super(modalObj);
    }

    InitializeListeners(targetDiv){
        let self = this;
        this._targetDiv = targetDiv;
        $(this._targetDiv).find("#closeError").click(function(){
            self.HideModal();
        });
    }

}

module.exports = PasswordErrorModal;