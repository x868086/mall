import Ajax from 'js/Ajax.js';
import url from 'js/api.js';

class AddressService{

    constructor(){

    }

    static getlist(){
        return Ajax(url.addressList)
    }

    static add(data){
        return Ajax(url.addressAdd,data)
    }

    static remove(id){
        return Ajax(url.addressRemove,id)
    }

    static update(data){
        return Ajax(url.addressUpdate,data)
    }

    static default(id){
        return Ajax(url.addressDefault,id)
    }


}

export default AddressService