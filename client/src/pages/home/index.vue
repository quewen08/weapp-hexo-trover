<template>
    <scroll-view
        :scroll-y="true"
        :enable-back-to-top="true"
        enableFlex
        :enhanced="true"
        :show-scrollbar="false"
        class="home"
    >
        <view class="post-container">
            <post-item v-for="data in postList" :key="data.title" :data="data" @tap="navigateToPostDeatail(data)" />
        </view>
        <lite-loading v-if="isLoading" text="正在加载..." icon="jingyu" />
        <lite-loading v-else-if="!hasMore" text="本来无一物，何处惹尘埃 ╮(╯▽╰)╭" />
    </scroll-view>
</template>

<script>
import PostItem from '@/components/post-item'
import LiteLoading from '@/components/lite-loading'
import Taro from '@tarojs/taro'

export default {
    components: {
        'post-item': PostItem,
        'lite-loading': LiteLoading,
    },
    data() {
        return {
            isLoading: false,
            hasMore: false,
            postList: [],
            pageNum: 1,
            pageSize: 10,
        }
    },
    mounted() {
        this.getPostList()
    },
    methods: {
        getPostList() {
            const db = Taro.cloud.database()
            const _ = db.command

            db.collection('postList')
                .where({
                    _id: _.exists(true),
                })
                .skip((this.pageNum - 1) * this.pageSize)
                .limit(this.pageSize)
                .get()
                .then((res) => {
                    var data = res.data || []
                    data.forEach((e) => {
                        if (e.cover == null) {
                            e.cover = 'https://p2.ssl.qhimg.com/bdr/__85/t0123d36a2655435cb9.jpg'
                        }
                        if (e.top == null) {
                            e.top = false
                        }
                    })
                    if (this.pageNum === 1) {
                        wx.stopPullDownRefresh()
                        // if (data.length > 3) {
                        //     this.swiperList = data.slice(0, 3)
                        // }
                    }
                    this.haseMore = data.length < this.pageSize
                    this.isLoading = false
                    this.postList = this.postList.concat(data)
                })
                .catch((err) => {
                    console.error('获取postList失败', err)
                    Taro.showToast({
                        icon: 'error',
                        title: '获取文章失败',
                    })
                    this.isLoading = false
                })
        },
        navigateToPostDeatail(e) {
            Taro.navigateTo({
                url: `/pages/postDetail/postDetail?path=${e?.path}&slug=${e?.slug}`,
            })
        },
    },
    onPullDownRefresh() {
        this.pageNum = 1
        this.postList = []
        this.isLoading = true
        this.hasMore = true
        this.getPostList()
    },
    onReachBottom() {
        if (!this.isLoadingComplete) {
            let currentPageNum = this.pageNum
            this.isLoading = true
            this.pageNum = currentPageNum + 1
            this.getPostList()
        }
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
.home {
    width: 100%;
    height: 100%;
    padding: 0 10px 30px 10px;

    .post-container {
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
