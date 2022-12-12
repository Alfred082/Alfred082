// let baseUrl = `https://wxapp.geekreading.cn/api/`;
let baseUrl = `https://www.mislaydream.com/`;

function getHeader() {
    if (wx.getStorageSync('Token')) {
        return {
            'content-type': 'application/json',
            'token': wx.getStorageSync('Token')
        }
    } else {
        return {
            'content-type': 'application/json'
        }
    }
}

function getPromise(url, data, method) {
    var json = JSON.stringify(data)
    console.log(json)
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}${url}`,
            header: getHeader(),
            method: method,
            data: json,
            success: function(res) {
                console.log(res)
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}

const http = {
    get: function(url, data = {}) {
        return getPromise(url, data, 'GET')
    },
    post: function(url, data = {}) {
        return getPromise(url, data, 'POST')
    },
    put: function(url, data = {}) {
        return getPromise(url, data, 'PUT')
    },
    delete: function(url, data = {}) {
        return getPromise(url, data, 'DELETE')
    }
}

export default http;