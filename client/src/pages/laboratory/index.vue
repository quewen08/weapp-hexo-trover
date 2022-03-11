<template>
    <view class="laboratory">
        <image mode="aspectFill" :src="require('@/assets/illustration/waitting.svg')" />
    </view>
</template>

<style lang="scss">
.laboratory {
    width: 750px;
    height: 100vh;
    background-color: $color-background-deep;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
        height: 240px;
    }
}
</style>
