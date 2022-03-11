<template>
    <view class="history">
        <PostList
            v-for="item in histories"
            :key="item.slug"
            :cover="item.cover"
            :title="item.title"
            :slug="item.slug"
            :excerpt="item.excerpt"
        >
            <template #infoList>
                <view class="infoItem">
                    <iicon name="icontime-circle" style="margin-right: 2px" />
                    <text>{{ formateDate(item.updated) }}</text>
                </view>
            </template>
        </PostList>
        <LiteLoading text="本来无一物，何处惹尘埃 ~" />
    </view>
</template>

<script>
import Taro from '@tarojs/taro'
import icon from '@/components/icon'
import PostList from '@/components/post-list'
import LiteLoading from '@/components/lite-loading'
import { formateDate } from '@/utils/index'

export default {
    components: {
        iicon: icon,
        PostList: PostList,
        LiteLoading: LiteLoading,
    },
    data() {
        return {
            histories: [],
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.histories = Taro.getStorageSync('history')
            if (this.histories.length > 0) this.histories = this.histories.reverse()
        },
        formateDate(date) {
            return formateDate(date)
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
.history {
    width: 750px;
    min-height: 100vh;
    padding: 30px 0;
    background-color: $color-background-deep;
}

.infoItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
}
</style>
