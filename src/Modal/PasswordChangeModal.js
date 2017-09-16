let Modal = require(_.path + 'src/Modal/Modal');

class PasswordChangeModal extends Modal{

    constructor(modalObj){
        super(modalObj);
    }

    InitializeListeners(){
        let self = this;
        $("#right-panel").find("#main-content-close").click(function(){
            self.HideModal();
            $("#modal-container").empty();
        });
    }

};

module.exports =  PasswordChangeModal;