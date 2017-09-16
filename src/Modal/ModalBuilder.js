let Modal                   = require(_.path + 'src/ModalNames'),
    CommonAJax              = require(_.path + 'src/CommonAjax'),
    PasswordCreationModal   = require(_.path + 'src/Modal/PasswordCreationModal'),
    PromptForPassword       = require(_.path + 'src/Modal/PromptForPassword'),
    PasswordErrorModal      = require(_.path + 'src/Modal/PasswordErrorModal'),
    HistoryModal            = require(_.path + 'src/Modal/HistoryModal'),
    PasswordChangeModal     = require(_.path + 'src/Modal/PasswordChangeModal');
class ModalBuilder {
    constructor(){
    }
    /**
    *@param modalName the name of the modal to find
    *@param typeModal the type of modal to instaniate and initialize its listeners
    *@param loadInto the div inwhich we will load the ajax modal into.
    */
    CreateModal(modalName, typeModal, loadInto, partialView){
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
                    break;
                case Modal.HistoryModal:
                    modalObj = new HistoryModal(modal);
                    break;
                case Modal.PasswordChangeModal:
                    modalObj = new PasswordChangeModal(modal);
                    modalObj.InitializeListeners();
                    break;
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