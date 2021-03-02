// center.js
const app = getApp(); // 引入全局数据
const {
    Post,
    Get
} = require('../../utils/api-request')

Page({
    data: {
        userNickName: '未登录', // 用户昵称
        userAccount: '用户账户', // 用户 id
        userAvatarUrl: '/images/default_avatar.png', // 用户头像地址
        fansNum: 0,
        followNum: 0,
        blogNum: 0,
        numberList: [
            {
                key: 'center-follow',
                title: '关注',
                num: 0, // 关注用户数量
            },
            {
                key: 'center-fans',
                title: '粉丝',
                num: 0, // 粉丝数量
            },
            {
                key: 'center-blogs',
                title: '文章',
                num: 0, // 用户发表文章数量
            },
        ],
        likeList: [
            {
                key: 'center-like',
                title: '我的点赞',
                icon: 'cuIcon-appreciatefill',
            },
            {
                key: 'center-collect',
                title: '我的收藏',
                icon: 'cuIcon-favorfill',
            },
            {
                key: 'center-comment',
                title: '评论',
                icon: 'cuIcon-newfill',
            },
            {
                key: 'center-beLike',
                title: '收到的点赞',
                icon: 'cuIcon-likefill',
            },
            {
                key: 'center-notice',
                title: '通知',
                icon: 'cuIcon-noticefill',
            },
            {
                key: 'center-setting',
                title: '设置',
                icon: 'cuIcon-settingsfill',
            },
        ]
    },
    onLoad: function() {
        this.initUserInfo()
        this.initNum()
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
                userAvatarUrl: res.data.info_avatar || '/images/default_avatar.png'
            })
        })
    },
    // 初始化数量信息
    initNum() {
        const _data = {
            user_id: wx.getStorageSync('userID')
        }
        Get('/getUserFansNum', _data).then(res => {
            if(res.status !== 200) return
            let fansNum = 'numberList[1].num'
            this.setData({
                [fansNum]: res.data.fansNum
            })
        })
        Get('/getUserFollowsNum', _data).then(res => {
            if(res.status !== 200) return
            let followNum = 'numberList[0].num'
            this.setData({
                [followNum]: res.data.followNum
            })
        })
        Get('/getUserBlogsNum', _data).then(res => {
            if(res.status !== 200) return
            let blogsNum = 'numberList[2].num'
            this.setData({
                [blogsNum]: res.data.blogsNum
            })
        })
    },
    // 点击个人中心九宫格事件
    clickCenterEvent(e) {
        const type = e.currentTarget.dataset.gridkey
        // 设置
        if(type === 'center-setting') {
            wx.navigateTo({
                url: '/pages/UserSetting/setting',
                fail: (err) => { console.log(err) },
            });
        }
    }
})