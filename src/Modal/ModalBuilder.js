let Modal      = require(_.path + 'src/ModalNames'),
    CommonAJax = require(_.path + 'src/CommonAjax'),
    PasswordCreationModal = require(_.path + 'src/Modal/PasswordCreationModal');
class ModalBuilder {
    constructor(){
    }
    /**
    *@param modalName the name of the modal to find
    *@param typeModal the type of modal to instaniate and initialize its listeners
    *@param loadInto the div inwhich we will load the ajax modal into.
    */
    CreateModal(modalName, typeModal, loadInto){
        let modal,
            modalObject = $.Deferred(),
            inlinePromise;

        inlinePromise = CommonAJax.GetPartialView(_.PasswordCreationModal);
        inlinePromise.done(function(result){
            $('#' + loadInto).html(result);
            let modalObj;
            modal = document.getElementById(modalName);
            switch(typeModal){
                case Modal.PasswordModal:
                    modalObj = new PasswordCreationModal(modal);
                    modalObj.InitializeListeners();
                    break;
                default:
                    throw new type.error("typeModal was not found");
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