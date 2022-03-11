import { createApp } from 'vue'
import Taro from '@tarojs/taro'
// import towxml from '@/components/towxml/index'

import './app.scss'

const app = createApp({
    onLaunch() {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            console.log(res.hasUpdate)
        })
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '版本更新',
                content: '检测到新版本，是否重启小程序？',
                success: function (res) {
                    if (res.confirm) {
                        updateManager.applyUpdate()
                    }
                },
            })
        })
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
                title: '版本更新',
                content: '新版本下载失败，请稍后重试',
                showCancel: false,
            })
        })
    },
    onShow(options) {
        if (process.env.TARO_ENV === 'weapp') {
            Taro.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                env: 'alex-weather-0387ea',
                traceUser: true,
            })
        }
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// app.use(store)
// app.use(towxml)

export default app
