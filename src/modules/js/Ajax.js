import axios from 'axios';

function ajax(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res=>{
            return resolve(res)
        }).catch(error=>{
            return reject(error)
        })
    })
}

export default ajax