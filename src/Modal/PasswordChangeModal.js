let Modal = require(_.path + 'src/Modal/Modal');

class PasswordChangeModal extends Modal{

    constructor(modalObj){
        super(modalObj);
        this._newPassword;
    }

    get newPassword(){
        return this._newPassword;
    }

    /**
    * @param args[0] password of type string
    * @param args[1] callback function to change the password of the information panel
    */
    InitializeListeners(args){
        let self = this,
            password = args[0],
            callback = args[1];
        $("#right-panel").find("#main-content-close").click(function(){
            self.HideModal();
            $("#modal-container").empty();
        });
    
        $("#right-panel").find("#UpdatePasswordBtn").click(function(){
            let newPassword = $("#right-panel").find("#generatedPassword").val();
            self._newPassword = newPassword;
            callback.ChangePasswordField(newPassword);
            self.HideModal();
        });
    }

};

module.exports =  PasswordChangeModal;