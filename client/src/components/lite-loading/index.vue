<template>
    <view class="liteLoad">
        <icon v-if="icon" type='image' :name="icon" size="18" />
        <text class="text">{{text || '加载中……'}}</text>
    </view>
</template>

<script>
import icon from '@/components/icon'
export default {
    components: {
        icon: icon,
    },
    props: {
        text: String,
        icon: String,
    },
}
</script>

<style lang="stylus">
.liteLoad {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    margin-left: 10px;
    font-size: 24px;
    color: $color-light;
  }
}
</style>
