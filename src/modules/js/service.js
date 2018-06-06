import Ajax from 'js/Ajax.js';

class Cart{
    constructor(){

    }

    //这里参数goods是对象即值引用（值引用），如果传递参数是普通数值（值复制）则修改后无法关联修改原值
    static add(url,data,goods){
        Ajax(url,data).then(res=>{
            goods.number++;
        }).catch(res=>{
            console.log('cartAdd error!')
        })
    }

    static reduce(url,data,goods){
        Ajax(url,data).then(res=>{
            goods.number--;
        }).catch(res=>{
            console.log('cartReduce error!')
        })
    }
}

export default Cart