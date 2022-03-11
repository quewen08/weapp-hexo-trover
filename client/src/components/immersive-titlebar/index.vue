<template>
    <view class="immersiveTitlebar" @tap="scrollToTop">
        <view class="container" :style="{ height: `${titlebarHeight[2]}PX` }">
            <m-icon
                type="image"
                name="left"
                size="20"
                :style="{ 'margin-right': '5rpx', 'margin-bottom': '26rpx' }"
                @tap="clickToBack"
            />
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script>
import icon from '@/components/icon'
import Taro from '@tarojs/taro'

export default {
    props: ['title'],
    components: {
        'm-icon': icon,
    },
    data() {
        return {
            titlebarHeight: [44, 44, 88],
            titlebarRef: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        scrollToTop() {
            Taro.pageScrollTo({
                scrollTop: 0,
                duration: 300,
            })
        },
        clickToBack() {
            Taro.navigateBack().catch(() => {
                Taro.switchTab({ url: '/page/home/index' })
            })
        },
        init() {
            const _that = this
            Taro.getSystemInfo().then((e) => {
                let customBar, headerBar
                const { statusBarHeight, system } = e
                let rect = Taro.getMenuButtonBoundingClientRect()
                if (system.toLowerCase().indexOf('ios' > -1)) {
                    customBar = rect.bottom + (rect.top - statusBarHeight) * 2
                    headerBar = customBar - statusBarHeight
                } else {
                    headerBar = rect.height + (rect.top - statusBarHeight) * 2
                    customBar = headerBar + statusBarHeight
                }
                _that.titlebarHeight = [headerBar, statusBarHeight, customBar]
            })
        },
    },
    onPageScroll({ scrollTop }) {
        const MAX_HEIGHT = 250
        if (this.titlebarRef?.current)
            this.titlebarRef.current.style.opacity = scrollTop > MAX_HEIGHT ? '1' : String(scrollTop / MAX_HEIGHT)
    },
}
</script>

<style lang="scss">
.immersiveTitlebar {
    width: 100vw;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    opacity: 0;

    .container {
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding: 0 30px;
    }

    .title {
        font-size: 1em;
        margin-bottom: 26rpx;
        padding-right: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
