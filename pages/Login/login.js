// login.js
const app = getApp() // 获取应用实例
const {
    Post,
    Get
} = require('../../utils/api-request')

Page({
    data: {
        username: "",
        password: "",
        loginMessage: false,
        loadMessage: "加载中",
        // loadModal: false, // 加载动画
    },
    onLoad() {
        const token = wx.getStorageSync('token')
        const userID = wx.getStorageSync('userID')
        if(token && userID) {
            wx.switchTab({
                url: '/pages/UserCenter/center',
                fail: (err) => { console.log('跳转失败') },
            })
        }
    },
    // 输入账户
    usernameInput(e) {
        this.setData({
            username: e.detail.value
        });
    },
    // 输入密码
    passwordInput(e) {
        this.setData({
            password: e.detail.value
        });
    },
    // 登录
    login() {
        if (!this.data.username) {
            apiResult.warn("账号不能为空");
            return;
        }
        if (!this.data.password) {
            apiResult.warn("密码不能为空");
            return;
        }
        const param = {
            userAccount: this.data.username,
            password: this.data.password
        }
        Post('/userLogin', param).then(res => {
            if (res.status === 200) {
                // 保存用户 token 用户 id
                wx.setStorageSync('token', res.token)
                wx.setStorageSync('userID', res.user_id)

                // 跳转到个人中心
                wx.switchTab({
                    url: '/pages/UserCenter/center',
                    success: (result)=>{
                        
                    },
                    fail: (err) => { console.log('跳转失败') },
                });
            } else {
                console.log(res)
            }
        })
    },
    // 注册
    register() {
        if (!this.data.username) {
            apiResult.warn("账号不能为空");
            return;
        }
        if (!this.data.password) {
            apiResult.warn("密码不能为空");
            return;
        }
        const param = {
            username: this.data.username,
            password: this.data.password,
        }
        Post('/userRegister', param).then(res => {
            if (res.status === 200) {
                this.setData({
                    loginMessage: false
                })
            } else {
                console.log(res)
            }
        })
    },
    // 切换登录/注册
    getMessage() {
        const loginMessage = this.data.loginMessage;
        this.setData({
            username: "",
            password: ""
        })
        if (loginMessage) {
            this.setData({
                loginMessage: false
            })
        } else {
            this.setData({
                loginMessage: true
            })
        }
    }

})