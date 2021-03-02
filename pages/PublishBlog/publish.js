const content = require('./content')
Page({
    data: {
        content,
        editable: true
    },
    onLoad: function () {
        this.ctx = this.selectComponent('#article')
        /**
         * @description 设置获取链接的方法
         * @param {String} type 链接的类型（img/video/audio/link）
         * @param {String} value 修改链接时，这里会传入旧值
         * @returns {Promise} 返回线上地址（type为音视频时可以返回一个数组作为源地址）
         */
        this.ctx.getSrc = (type, value) => {
            return new Promise((resolve, reject) => {
                if (type == 'img') {
                    wx.showActionSheet({
                        itemList: ['本地选取', '远程链接'],
                        success: res => {
                            // 本地选取
                            if (res.tapIndex == 0)
                                wx.chooseImage({
                                    count: 1,
                                    success: res => {
                                        /* 实际使用时，这里需要上传到服务器后返回
                                        wx.showLoading({
                                          title: '上传中'
                                        })
                                        wx.uploadFile({
                                          url: 'xxx', // 接口地址
                                          filePath: res.tempFilePaths[0],
                                          name: 'xxx',
                                          success(res) {
                                            resolve(res.data.path) // 返回线上地址
                                          },
                                          fail: reject,
                                          complete: wx.hideLoading
                                        })*/
                                        resolve(res.tempFilePaths[0])
                                    },
                                    fail: reject
                                })
                            // 远程链接
                            else {
                                this.callback = {
                                    resolve,
                                    reject
                                }
                                this.setData({
                                    modal: {
                                        title: '图片链接',
                                        value
                                    }
                                })
                            }
                        }
                    })
                } else {
                    this.callback = {
                        resolve,
                        reject
                    }
                    let title
                    if (type == 'video')
                        title = '视频链接'
                    else if (type == 'audio')
                        title = '音频链接'
                    else if (type == 'link')
                        title = '链接地址'
                    this.setData({
                        modal: {
                            title,
                            value
                        }
                    })
                }
            })
        }
    },
    // 处理模态框
    modalInput(e) {
        this.value = e.detail.value
    },
    modalConfirm() {
        this.callback.resolve(this.value || this.data.modal.value || '')
        this.setData({
            modal: null
        })
    },
    modalCancel() {
        this.callback.reject()
        this.setData({
            modal: null
        })
    },
    // 调用编辑器接口
    edit(e) {
        this.ctx[e.currentTarget.dataset.method]()
    },
    // 清空编辑器内容
    clear() {
        wx.showModal({
            title: '确认',
            content: '确定清空内容吗？',
            success: res => {
                if (res.confirm)
                    this.ctx.clear()
            }
        })
    },
    // 保存编辑器内容
    save() {
        var content = this.ctx.getContent()
        wx.showModal({
            title: '发表',
            content,
            confirmText: '完成',
            success: res => {
                if (res.confirm) {
                    // 实际使用时，这里需要上传到服务器
                    // 复制到剪贴板
                    wx.setClipboardData({
                        data: content,
                    })
                    // 结束编辑
                    this.setData({
                        editable: false
                    })
                }
            }
        })
    }
})