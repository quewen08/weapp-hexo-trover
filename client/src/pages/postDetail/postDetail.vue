<template>
    <loading v-if="status == 'loading'" />
    <view v-else-if="status == 'ready'" class="post">
        <immersive-titlebar :title="post?.title || ''" :style="{ opacity: titleOpactiy }" />
        <view class="head">
            <image v-if="post.cover != null" lazy-load :src="post.cover" class="cover" mode="aspectFill" />
            <view class="mask">
                <text class="title">{{ post?.title || '' }}</text>
                <view class="info">
                    <view class="info-item">
                        <m-icon size="20" name="iconcalendar" style="margin-right: 5rpx" />
                        <text>创建于 {{ formateDate(post?.date) }}</text>
                    </view>
                    <view class="info-item">
                        <m-icon size="20" name="iconcalendar" style="margin-right: 5rpx" />
                        <text>最后修改于 {{ formateDate(post?.updated) }}</text>
                    </view>
                </view>
            </view>
        </view>
        <towxml class="content" v-if="post?.more != null" :nodes="post.more"></towxml>
    </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { getPostBySlug, getPost } from '@/apis/api'
import Loading from '@/components/loading'
import icon from '@/components/icon'
import ImmersiveTitlebar from '@/components/immersive-titlebar'
import towxmlApp from '@/components/towxml/index'
import { formateDate } from '@/utils/index'

export default {
    components: {
        loading: Loading,
        'immersive-titlebar': ImmersiveTitlebar,
        'm-icon': icon,
    },
    data() {
        return {
            titleOpactiy: 0,
            status: 'loading',
            slug: undefined,
            path: undefined,
            images: [],
            post: undefined,
        }
    },
    created() {
        // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，
        // 而不是频繁地调用此 API
        this.$instance = Taro.getCurrentInstance()
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let params = this.$instance.router?.params || {}
            this.slug = params.slug || null
            this.path = params.path || null
            this.fetchPost()
        },
        fetchPost() {
            var _that = this
            if (_that.slug != null) {
                getPostBySlug(_that.slug)
                    .then((res) => {
                        _that.handlData(res)
                    })
                    .catch((e) => {
                        console.log(e.message == 'Error: 404' && _that.path != null)
                        if (e.message == 'Error: 404' && _that.path != null) {
                            _that.bycloud()
                        } else {
                            Taro.showToast({
                                title: '获取文章失败',
                                icon: 'error',
                                duration: 5000,
                            })
                        }
                    })
            } else if (_that.path != null) {
                _that.bycloud()
            }
        },
        bycloud() {
            wx.cloud
                .callFunction({
                    name: 'http',
                    data: {
                        type: 'postDetail',
                        url: this.path || '',
                    },
                })
                .then((res) => {
                    let data = res.result
                    this.handlData(data)
                })
                .catch(() => {
                    Taro.showToast({
                        title: '获取文章失败',
                        icon: 'error',
                        duration: 5000,
                    })
                })
        },
        handlData(data) {
            if (data) {
                const { title } = data
                Taro.setNavigationBarTitle({ title })
                if (data.cover == null) {
                    data.cover = 'https://p2.ssl.qhimg.com/bdr/__85/t0123d36a2655435cb9.jpg'
                }

                let copyPost = data.more
                copyPost = copyPost.replace(/<figure /g, '<pre ')
                copyPost = copyPost.replace(/<\/figure>/g, '</pre>')

                copyPost = copyPost.replace(/<td class=\"gutter\"><pre>.*<\/pre><\/td><td /g, '<td ')
                copyPost = copyPost.replace(/<table><tr><td class=\"code\"><pre>/g, '<code>')
                copyPost = copyPost.replace(/<\/pre><\/td><\/tr><\/table>/g, '</code>')

                copyPost = copyPost.replace(/<img([^>]*)src="([^"]*)"([^>]*)>/gim, (match, attrBegin, src, attrEnd) => {
                    // 缓存所有图片
                    const imagesTemp = this.images
                    imagesTemp.push(src)
                    this.images = [...imagesTemp]
                    return `<img ${attrBegin} src='${src}' mode='widthFix' id='image_${src}' lazy-load ${attrEnd}>` // 重定义图片标签
                })

                let result = towxmlApp(copyPost, 'html', {
                    events: {
                        tap: (event) => {
                            // 只处理图片和链接的点击事件
                            if (event.currentTarget.dataset.data && event.currentTarget.dataset.data.attrs) {
                                if (event.currentTarget.dataset.data.attrs.class == 'h2w__img') {
                                    const imageMatch = event.currentTarget.dataset.data.attrs.id.match(/(image_).*/g)
                                    if (imageMatch) {
                                        Taro.previewImage({
                                            current: imageMatch[0]?.replace('image_', '') || '',
                                            urls: this.images,
                                        })
                                    }
                                } else if (event.currentTarget.dataset.data.attrs.class == 'h2w__a') {
                                    let url = event.currentTarget.dataset.data.attrs.href || ''
                                    Taro.setClipboardData({
                                        data: url,
                                    })
                                }
                            }
                        },
                    },
                })

                this.post = { ...data }
                this.post.more = { ...result }
                this.status = 'ready'
                this.setHistoryStorage(this.post)
            }
        },
        formateDate(res) {
            return formateDate(res)
        },
        setHistoryStorage(data) {
            const key = 'history'
            const arr = Taro.getStorageSync(key) || []
            arr.forEach((item, index) => {
                if (data.slug === item.slug) {
                    arr.splice(index, 1)
                }
            })
            arr.push(data)
            Taro.setStorageSync(key, arr)
        },
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: `${this.post?.title}-南山居` || '南山居',
            path: `/pages/postDetail/postDetail?path=${this.path}&slug=${this.slug}`,
        }
    },
    onShareTimeline() {
        return {
            title: `${this.post?.title}-南山居` || '南山居',
            path: `/pages/postDetail/postDetail?path=${this.path}&slug=${this.slug}`,
        }
    },
    onPageScroll(e) {
        const MAX_HEIGHT = 250
        this.titleOpactiy = e.scrollTop - MAX_HEIGHT > 0 ? '1' : String(e.scrollTop / MAX_HEIGHT)
    },
}
</script>

<style lang="scss">
.post {
    .head {
        position: relative;
        height: 75vw;

        .cover {
            width: 100%;
            height: 100%;
            vertical-align: middle;
            border-style: none;
        }

        .mask {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
            padding: 30px;
            color: $color-white;

            .title {
                font-size: 1.4rem;
                margin-bottom: 0.5rem;
            }

            .info {
                display: flex;
                align-items: center;
                font-size: 0.8rem;

                .info-item {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                }
            }
        }
    }

    .content {
        padding: 30px;
        color: $color-middle;
        line-height: 2;
        font-size: 0.85em;

        @for $i from 1 through 6 {
            .h#{$i} {
                font-size: 1.6 - $i * 0.1rem;
                margin-bottom: 1rem;
                margin-top: 2rem;
                color: $color-default;
                font-weight: bold;
            }
        }

        .img {
            display: block;
            width: 100%;
            margin: 0 auto;
        }

        .p,
        .li {
            .code {
                background-color: $color-background-deep;
                padding: 2px 5px;
                border-radius: 2px;
                color: $color-link;
            }
        }

        .a {
            text-decoration: underline;
        }

        .ul {
            padding-left: 1.2em;

            .li {
                display: list-item;
                list-style-type: disc;
            }
        }

        .ol {
            padding-left: 1.2em;

            .li {
                display: list-item;
                list-style-type: decimal;
            }
        }

        .strong {
            font-weight: bold;
        }

        .em {
            font-style: italic;
        }

        .u {
            text-decoration: underline;
        }

        .del {
            text-decoration: line-through;
        }

        .kbd {
            padding: 0.2em 0.4em;
            font-size: 87.5%;
            color: $color-background;
            background-color: $color-default;
            border-radius: 0.2em;
        }

        .table {
            margin: 10px auto;
            min-width: 100%;
            text-align: center;
        }

        .table,
        .table .td,
        .table .th {
            border: 1px solid $color-default;
            border-collapse: collapse;
            padding: 5px;
        }

        .figure {
            color: $color-default;
            margin: 0;
            overflow: auto;
            margin-bottom: 20px;

            .table {
                border: none;

                .td {
                    padding: 0;

                    &.gutter {
                        display: none;
                    }

                    &.code {
                        background-color: $color-background-deep;
                        padding: 1em;
                        border: none;
                    }

                    .table,
                    .pre {
                        margin: 0;
                        text-align: left;
                        border: 0;
                    }
                }
            }
        }

        .blockquote {
            margin: 0.85em 0;
            padding: 15px 20px;
            background-color: $color-background-deep;
            border-left: 4px solid $color-link;

            .p {
                margin: 0;
            }
        }

        .image-caption {
            display: block;
            margin: 10px auto;
            text-align: center;
            font-weight: bold;
        }
    }
}
</style>
