// 处理接口返回数据工具
function requestError(msg) {
    wx.showToast({
        title: msg,
        duration: 1200,
        mask: true,
        // image: '/images/error.png',
        icon: 'none',
        complete: () => {
            let pages = getCurrentPages();
            let current_page = pages[pages.length - 1].route
            if (current_page !== 'pages/Login/login') {
                wx.navigateTo({
                    url: "/pages/Login/login"
                })
            }
        }
    })
}

function error(msg) {
    wx.showToast({
        title: msg,
        duration: 1500,
        mask: true,
        image: '/images/error.png'
    });
}

function warn(msg) {
    wx.showToast({
        title: msg,
        duration: 1500,
        mask: true,
        image: '/images/warn.png',
    });
}

function success(msg) {
    wx.showToast({
        title: msg,
        duration: 2000,
        mask: true,
        image: '/images/success.png'
    });
}

function simple(msg) {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1000,
        mask: true
    })
}

const StateCode = {
    success: 200,
    error: 500,
}

module.exports = {
    requestError,
    error,
    warn,
    success,
    simple,
    StateCode,
}