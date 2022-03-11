// 云函数入口文件
const cloud = require('wx-server-sdk')

//引入request-promise用于做网络请求
var rp = require('request-promise')

cloud.init({
    env: 'alex-weather-0387ea',
    traceUser: true,
})

const db = cloud.database()
const _ = db.command

var collect = (url, collectionName) => {
    rp(url)
        .then(res => {
            db.collection(collectionName).where({
                _id: _.exists(true)
            }).remove()
                .then(() => {
                    db.collection(collectionName).add({
                        // data 字段表示需新增的 JSON 数据
                        data: JSON.parse(res)
                    }).then(() => {
                        console.log('更新%s成功', collectionName)
                    }).catch(err => {
                        console.error('更新%s失败', collectionName, err)
                    })
                })
                .catch(err => {
                    console.error('删除%s失败', collectionName, err)
                })
        })
        .catch(err => {
            console.error('获取%s失败', collectionName, err)
        });
}

// 云函数入口函数
exports.main = async (event, context) => {
    collect('https://quewen08.github.io/api/posts.json', 'postList')
    collect('https://quewen08.github.io/api/tags.json', 'tagList')
}