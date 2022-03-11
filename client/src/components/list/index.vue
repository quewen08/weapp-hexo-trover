<template>
    <view class="list" @tap="onClick">
        <view class="left">
            <m-icon v-if="icon" type="image" :name="icon" size="20" style="margin-right: 5px" />
            <text class="title">{{ title }}</text>
        </view>
        <view class="right">
            <text v-if="extraText != null" class="extraText">{{ extraText }}</text>
            <m-icon v-if="arrow" type="image" name="right" size="16" style="margin-left: 5px" />
        </view>
    </view>
</template>

<script>
import icon from '@/components/icon'

export default {
    components: {
        'm-icon': icon,
    },
    props: ['title', 'icon', 'arrow', 'onClick', 'extraText'],
}
</script>

<style lang="scss">
.list {
    padding: 20px 5vw;
    margin-bottom: 20px;
    width: 750px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $color-background;

    .left,
    .right {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 28px;
        line-height: 28px;
        color: $color-default;
    }

    .extraText {
        font-size: 28px;
        line-height: 28px;
        color: $color-middle;
    }
}
</style>
