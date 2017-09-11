// super class for the model and create partial views for them.

class Modal {
    /**
    *@param ModalObject Contains the modal object which is usually created in the modal builder
    * object
    */
    constructor(ModalObject){
        if(new.target !== Modal){
          this._modal = ModalObject;

        } else {
            throw new type.error("Cannot create instance of absract class");
        }
        
    }
    
    set modal(m){
        this._modal = m;
    }

    get modal(){
        return this._modal;
    }

    HideModal(){
        this._modal.style.display = "none";
    }

    ShowModal(){
        this._modal.style.display = "block";
    }

    DestoryModal(){

    }


}

module.exports = Modal;