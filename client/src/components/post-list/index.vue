<template>
    <view class="postList" @tap="toDetail">
        <image class="cover" :src="cover" lazyKoad mode="aspectFill" />
        <view class="content">
            <text class="title">{{ title }}</text>
            <view class="excerpt">
                <text>{{ excerpt }}</text>
            </view>
            <view class="info">
                <slot name="infoList" />
            </view>
        </view>
    </view>
</template>

<script>
import Taro from '@tarojs/taro'

export default {
    props: ['key', 'slug', 'cover', 'title', 'excerpt'],
    methods: {
        toDetail() {
            Taro.navigateTo({
                url: `/pages/postDetail/postDetail?slug=${this.slug}`,
            })
        },
    },
}
</script>

<style lang="stylus">
.postList {
  position: relative;
  margin-bottom: 30px;
  width: 750px;
  height: 225px;
  display: flex;
  background-color: $color-background;

  .cover {
    width: 300px;
    height: 225px;
  }

  .content {
    padding: 20px;
    width: 450px;
    height: 225px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      margin-bottom: 10px;
      font-size: 28px;
      font-weight: bold;
      color: $color-default;
    }

    .excerpt {
      text {
        height: 72px;
        font-size: 24px;
        text-align: justify;
        text-justify: inter-ideograph;
        color: $color-middle;
      }
    }
  }
}
</style>
