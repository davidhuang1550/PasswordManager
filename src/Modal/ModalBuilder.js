let Modal                   = require(_.ModalNames),
    CommonAJax              = require(_.CommonAjax),
    PasswordCreationModal   = require(_.PasswordCreationModalScript),
    PromptForPassword       = require(_.PromptForPasswordScript),
    PasswordErrorModal      = require(_.PassworderrorModalScript),
    HistoryModal            = require(_.HistoryModalScript),
    PasswordChangeModal     = require(_.PasswordChangeModalScript),
    LoginModal              = require(_.LoginModalScript);
class ModalBuilder {
    constructor(){
    }
    /**
    *@param modalName the name of the modal to find
    *@param typeModal the type of modal to instaniate and initialize its listeners
    *@param loadInto the div inwhich we will load the ajax modal into.
    */
    CreateModal(modalName, typeModal, loadInto, partialView, ...args){
        let modal,
            modalObject = $.Deferred(),
            inlinePromise;

        inlinePromise = CommonAJax.GetPartialView(partialView);
        inlinePromise.done(function(result){
            $('#' + loadInto).html(result);
            let modalObj;
        
            modal = document.getElementById(modalName);
            switch(typeModal){
                case Modal.PasswordModal:
                    modalObj = new PasswordCreationModal(modal);
                    modalObj.InitializeListeners();
                    break;
                case Modal.PromptForPassword:
                    modalObj = new PromptForPassword(modal);
                    modalObj.InitializeListeners();
                    break;
                case Modal.PasswordErrorModal:
                    modalObj = new PasswordErrorModal(modal);
                    modalObj.InitializeListeners(args);
                    break;
                case Modal.HistoryModal:
                    modalObj = new HistoryModal(modal);
                    modalObj.InitializeListeners(args);
                    break;
                case Modal.PasswordChangeModal:
                    modalObj = new PasswordChangeModal(modal);
                    modalObj.InitializeListeners(args);
                    //modalObj.InitializeListeners();
                    break;
                case Modal.LoginModal:
                    modalObj = new LoginModal(modal);
                    modalObj.InitializeListeners();
                default:
                    console.log("Modal not found");

                    break;
            }
            modalObject.resolve(modalObj);
        }).fail(function(){
            console.log("something went wrong inside modal creation");
        });
            
        return modalObject;
    }

}

module.exports =  ModalBuilder;