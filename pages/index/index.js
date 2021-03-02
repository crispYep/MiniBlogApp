// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        tabCur: 'home-follow', // 当前 tab 值
        tabList: [{
                key: 'home-follow',
                title: '关注'
            },
            {
                key: 'home-myBlog',
                title: '我发表的'
            },
            {
                key: 'home-browsing',
                title: '随便逛逛'
            },
        ], // tab 列表
        blogList: [
            {
                userId: '123', // 用户 id
                nickName: '昵称', // 用户昵称
                avatar: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png', // 头像地址
                title: '标题', // 文章标题
                coverImage: 'https://jpg.macz.com/pic/202008/24113132_90d785d35b.jpeg', // 封面图地址
                date: '日期', // 发表日期
                isLike: false, // 是否点赞
                likeCount: 0, // 点赞数量
                commentCount: 0, // 评论数量
                isCollect: false, // 是否收藏
            }
        ],
    },
    // tab 选项卡事件
    tabSelect(e) {
        console.log(e.currentTarget)
        this.setData({
            tabCur: e.currentTarget.dataset.id
        })
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})