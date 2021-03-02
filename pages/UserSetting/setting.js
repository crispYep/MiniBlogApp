const { 
    Post,
    Get,
    baseUrl
 } = require('../../utils/api-request')
 import apiResult from '../../utils/api-result';

Page({
    data: {
        showAvatarUrl: '/images/default_avatar.png', // 默认头像，上传后替换成上传头像地址
        avatarUrl: null, // 上传图像后后台返回的图像路径
        userAccount: null,
        userNickName: null,
        isLogout: false, // 显示确认退出登录弹框 
    },
    onLoad: function() {
        this.initUserInfo()
    },
    // 初始化用户信息
    initUserInfo() {
        const _data = {
            user_id: wx.getStorageSync('userID')
        }
        Get('/getUserInfo', _data).then((res) => {
            if(res.status !== 200) return
            this.setData({
                userNickName: res.data.info_nickname,
                userAccount: res.data.user_account,
                showAvatarUrl: res.data.info_avatar || '/images/default_avatar.png'
            })
        })
    },
    // 输入昵称
    nicknameInput(e) {
        this.setData({ userNickName: e.detail.value.trim() })
    },
    // 修改用户信息
    modifyUserInfo() {
        if(!this.data.userNickName) {
            apiResult.simple('用户昵称不能为空！')
        } else if(this.data.userNickName.length > 20 || this.data.userNickName.length <= 0) {
            apiResult.simple('用户昵称长度应为1-20之间！')
        }
        const _data = {
            nickName: this.data.userNickName,
            avatar: this.data.avatarUrl,
            userId: wx.getStorageSync('userID')
        }
        Post('/updateUserInfo', _data).then(res => {
            
        })
    },
    // 选择头像
    chooseAvatar() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                console.log(res)
                const tempFilePaths = res.tempFilePaths[0]
                this.setData({
                    showAvatarUrl: tempFilePaths
                });

                wx.uploadFile({
                    url: baseUrl + '/uploadAvatar', //服务器接口地址
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': wx.getStorageSync('token') || null
                    },
                    filePath: tempFilePaths,
                    name: 'file',
                    success:  (res) => {
                        const temp = JSON.parse(res.data)
                        this.setData({
                            avatarUrl: temp.data.avatarUrl
                        })
                        console.log(this.data.avatarUrl)
                    },
                    fail: (e)=> {
                        console.log(e.stack);
                    }

                })

            }

        })

    },
    // 退出登录
    logout() {
        wx.removeStorageSync('token')
        wx.removeStorageSync('userID')
        wx.reLaunch({
            url: '/pages/Login/login',
            success: (result)=>{
                apiResult.success('成功退出登录！')
            },
            fail: (err)=>{ 
                console.log(err)
                apiResult.error('退出登录失败！')
            },
        });
    },
    // 是否退出登录
    showModal() {
        this.setData({
            isLogout: true
        })
    },
    // 取消退出登录
    hideModal() {
        this.setData({
            isLogout: false
        })
    }
})