// 请求接口工具

import apiResult from './api-result';

const baseUrl = 'http://127.0.0.1:8090'

// get 请求
function Get(api, data = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + api,
            data: data,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'Authorization': wx.getStorageSync('token') || null
            },
            success(res) {
                if(res.data.status == 200) {
                    if(res.data.msg) apiResult.success(res.data.msg)
                    resolve(res.data)
                } else if(res.data.status == 403) {
                    wx.removeStorageSync('token')
                    wx.removeStorageSync('userID')
                    apiResult.requestError(res.data.msg)
                } else {
                    apiResult.warn(res.data.msg)
                }
            },
            fail(err) {
                apiResult.error('网络连接失败');
                reject(err)
            }
        })
    });
}

// post 请求
function Post(api, data = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + api,
            data: data,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Authorization': wx.getStorageSync('token') || null
            },
            success(res) {
                if(res.data.status == 200) {
                    if(res.data.msg) apiResult.success(res.data.msg)
                    resolve(res.data)
                } else if(res.data.status == 403) {
                    wx.removeStorageSync('token')
                    wx.removeStorageSync('userID')
                    apiResult.requestError(res.data.msg)
                } else {
                    apiResult.warn(res.data.msg)
                }
            },
            fail(err) {
                apiResult.error('网络连接失败');
                reject(err)
            }
        })
    });

}

// delete 请求
function Delete(api, data = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + api,
            data: data,
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
            },
            success(res) {
                if (res.data.status == apiResult.StateCode.success) {
                    resolve(res.data.data)
                } else {
                    apiResult.requestError(res.data);
                    reject(res.data)
                }
            },
            fail(err) {
                apiResult.error('网络连接失败');
                reject(err)
            }
        })
    });
}


module.exports = {
    Get,
    Post,
    Delete,
    baseUrl
}