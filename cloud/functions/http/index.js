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
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
    const { type } = event

    switch (type) {
        case 'tagList':
            // 先取出集合记录总数
            var countResult = await db.collection('tagList').count()
            var total = countResult.total
            // 计算需分几次取
            var batchTimes = Math.ceil(total / MAX_LIMIT)
            // 承载所有读操作的 promise 的数组
            var tasks = []
            for (let i = 0; i < batchTimes; i++) {
                const promise = db.collection('tagList').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
                tasks.push(promise)
            }
            // 等待所有
            return (await Promise.all(tasks)).reduce((acc, cur) => {
                return {
                    data: acc.data.concat(cur.data),
                    errMsg: acc.errMsg,
                }
            })
        case 'tagPostList':
            const param = event.param

            // 先取出集合记录总数
            var countResult = await db.collection('postList').where({
                tags: _.elemMatch({ name: _.eq(param), })
            }).count()
            var total = countResult.total
            // 计算需分几次取
            var batchTimes = Math.ceil(total / MAX_LIMIT)
            // 承载所有读操作的 promise 的数组
            var tasks = []
            for (let i = 0; i < batchTimes; i++) {
                const promise = db.collection('postList').where({
                    tags: _.elemMatch({ name: _.eq(param), })
                }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
                tasks.push(promise)
            }
            // 等待所有
            return (await Promise.all(tasks)).reduce((acc, cur) => {
                return {
                    data: acc.data.concat(cur.data),
                    errMsg: acc.errMsg,
                }
            })
        case 'postDetail':
            const url = 'https://quewen08.github.io/' + encodeURI(event.url)
            return await rp(url)
                .then(res => {
                    return JSON.parse(res)
                })
                .catch(err => {
                    console.error('获取文章详情失败', err)
                    throw err
                })
    }
}