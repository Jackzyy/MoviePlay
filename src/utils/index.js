import axios from 'axios'

var instance = axios.create({
    // baseURL: '/api',
    baseURL: '/',
    timeout: 15000
});

const fetch = {
    get(url,data,config){
        return new Promise((resolve, reject) => {
            instance.get(url, {params:data}, config).then(res =>{
                resolve(res.data)
            }).catch(err =>{
                reject(err)
            })
        });
    },
    
    post(url,data,config){
        return new Promise((resolve, reject) => {
            instance.post(url, data, config).then(res =>{
                resolve(res.data)
            }).catch(err =>{
                reject(err)
            })
        });
    },
}

export default fetch