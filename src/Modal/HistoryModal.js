let Modal = require(_.path + 'src/Modal/Modal');

class HistoryModal extends Modal{

    constructor(modalObj){
        super(modalObj);
    }

    InitializeListeners(targetDiv){
        let self = this;

        this._targetDiv = targetDiv;

        $(this._targetDiv).find("#history-content-close").click(function(){
            self.HideModal();
        });

    }
};

module.exports = HistoryModal;