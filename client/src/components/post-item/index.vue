<template>
    <view v-if="data != null" class="postItem">
        <view v-if="data.top != null && data.top" class="top" />
        <image
            v-if="data.cover != null"
            class="cover"
            :src="data.cover"
            lazy-load="{{true}}"
            mode="aspectFill"
            @binderror="bindErrorImg"
            data-errimg="{{data.cover}}"
        />
        <view class="content">
            <text class="title">{{ data.title }}</text>
            <!-- TODO add tags here -->
        </view>
    </view>
</template>

<script>
export default {
    props: {
        data: Object,
    },
    methods: {
        bindErrorImg: function (e) {
            console.log(e)
            var errorImageIndex = e.target.dataset.errimg
            var imgObject = 'postList[' + errorImageIndex + '].cover'
            var errorImage = {}
            errorImage[imgObject] = 'https://p2.ssl.qhimg.com/bdr/__85/t0123d36a2655435cb9.jpg'
            this.setData(errorImage)
        },
    },
}
</script>

<style lang="scss">
.postItem {
    position: relative;
    width: 47%;
    margin: 0 10px 20px 10px;
    border-radius: 15px;
    overflow: hidden;
    background-color: $color-background;
    box-shadow: $box-shadow;
    display: flex;
    flex-wrap: wrap;

    .top {
        position: relative;
        right: -32px;
        top: -32px;
        width: 50px;
        height: 50px;
        background-color: $color-link;
        transform: rotate(-45deg);
        box-shadow: -3px 5px 6px -5px rgba(0, 0, 0, 0.5);
    }

    .cover {
        width: 345px;
        height: 345px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .content {
        padding: 15px;
    }

    .title {
        @include substr(2);
        font-size: 28px;
        font-weight: bold;
    }

    .excerpt {
        @include substr(2);
        height: 72px;
        font-size: 24px;
        text-align: justify;
        text-justify: inter-ideograph;
    }
}
</style>
