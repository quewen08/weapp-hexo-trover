<template>
    <view class="my">
        <view class="banner banner-image">
            <view class="banner-info">
                <view>南山居</view>
                <view>By 东篱先生</view>
            </view>
        </view>
        <view class="tabnav">
            <view class="tabnavItem" @tap="showTodo">
                <m-icon size="30" name="tag" type="image" />
                <text class="text">收藏</text>
            </view>
            <view class="divide" />
            <view class="tabnavItem" @tap="showTodo">
                <m-icon size="30" name="like" type="image" />
                <text class="text">喜欢</text>
            </view>
            <view class="divide" />
            <view class="tabnavItem" @tap="showTodo">
                <m-icon size="30" name="reward" type="image" />
                <text class="text">打赏</text>
            </view>
            <view class="divide" />
            <button openType="share" class="tabnavItem" style="padding: 0; background: #fff; line-height: 1em">
                <m-icon size="30" name="share" type="image" />
                <text class="text">分享</text>
            </button>
        </view>
        <view class="listWrapper">
            <m-list
                title="浏览历史"
                icon="time"
                :arrow="true"
                :onClick="
                    () => {
                        navigatorTo('/pages/history/index')
                    }
                "
            />
            <m-list title="网页博客" icon="cloud" :arrow="true" :onClick="copyWeb" />
            <m-list
                title="实验功能"
                icon="experiment"
                :arrow="true"
                :onClick="
                    () => {
                        navigatorTo('/pages/laboratory/index')
                    }
                "
            />
            <m-list
                title="关于"
                icon="info-circle"
                :arrow="true"
                :onClick="
                    () => {
                        navigatorTo('/pages/about/index')
                    }
                "
            />
        </view>
    </view>
</template>

<script>
import Taro from '@tarojs/taro'
import icon from '@/components/icon'
import List from '@/components/list'
import { webUrl } from '/config.json'

export default {
    components: {
        'm-icon': icon,
        'm-list': List,
    },
    mounted() {},
    methods: {
        navigatorTo(url) {
            if (url) Taro.navigateTo({ url: url })
        },
        copyWeb() {
            Taro.setClipboardData({
                data: webUrl,
            })
        },
        showTodo() {
            Taro.showModal({
                title: '提示',
                content: '敬请期待',
                showCancel: false,
            })
        },
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '南山居',
            subtitle: '东篱先生',
            path: '/pages/home/index',
        }
    },
    onShareTimeline(res) {
        return {
            title: '南山居',
            subtitle: '东篱先生',
            path: '/pages/home/index',
        }
    },
}
</script>

<style lang="scss">
.officialAccount {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

.my {
    position: flex;
    flex: 1;
    widows: 100vw;
    height: 99vh;
    background-color: $color-background-deep;

    .banner-image {
        position: relative;
        top: -10px;
        left: -20px;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 400%;
        animation: animate 45s linear infinite;
        width: calc(100vw + 40px);
        height: calc(100vw * 3 / 4);
    }

    @keyframes animate {
        0% {
            background-position: 0%;
        }

        100% {
            background-position: 400%;
        }
    }

    .tabnav {
        position: relative;
        top: calc(100vw * 1 / 4 - 290px);
        left: 5vw;
        z-index: 1;
        width: 90vw;
        height: 22.5vw;
        display: flex;
        align-items: center;
        border-radius: 15px;
        background-color: $color-background;
        box-shadow: $box-shadow;

        .divide {
            width: 2px;
            height: 30px;
            background-color: #ccc;
        }

        .tabnavItem {
            height: 22.5vw;
            width: 22.5vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .text {
                margin-top: 10px;
                font-size: 24px;
                color: $color-default;
            }
        }
    }

    .listWrapper {
        position: relative;
        top: calc(100vw * 1 / 4 - 290px);
        left: 0;
        margin-top: 12vw;
    }
}
</style>
