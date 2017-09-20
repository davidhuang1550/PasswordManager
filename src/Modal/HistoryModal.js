let Modal = require(_.path + 'src/Modal/Modal');

class HistoryModal extends Modal{

    constructor(modalObj){
        super(modalObj);
    }

    /**
    * @param args[0] targetDiv to populate from.
    */ 
    InitializeListeners(args){
        let self = this;

        this._targetDiv = args[0];

        $(this._targetDiv).find("#history-content-close").click(function(){
            self.HideModal();
        });

    }
};

module.exports = HistoryModal;