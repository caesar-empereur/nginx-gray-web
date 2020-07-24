import axios from 'axios';

const API_ROOT = process.env.API_ROOT

console.log('打包获取当前环境的接口地址：' + API_ROOT);

const instance = axios.create({
    baseURL: API_ROOT,
    timeout: 5000
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        instance.get(url,{
            params:params
        })
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        instance.post(url,data)
            .then(response => {
                resolve(response);
            },err => {
                reject(err)
            })
    })
}
