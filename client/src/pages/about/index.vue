<template>
    <view class="about">
        <image class="logo" mode="aspectFill" :src="require('@/assets/images/avatar.png')" />
        <text class="version">v1.0.0©quewen08</text>
        <text class="title">weapp-hexo-trover</text>
        <view class="listWrapper"></view>
        <towxml v-if="readme != null" :nodes="readme"></towxml>
    </view>
</template>

<script>
import towxmlApp from '@/components/towxml/index'

export default {
    data() {
        return {
            readme: ``,
        }
    },
    methods: {
        init() {
            let result = towxmlApp(readmeData, 'markdown')
            this.readme = result
        },
    },
}
</script>

<style lang="scss">
.about {
    width: 750px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $color-background-deep;

    .logo {
        width: 200px;
        height: 200px;
        margin-top: 100px;
    }

    .title {
        font-size: 40px;
        font-weight: bold;
        margin-top: 30px;
        color: $color-default;
    }

    .version{
        font-size: 20px;
        font-weight: 300;
        margin-top: 20px;
        color: $color-default;
    }

    .listWrapper {
        width: 750px;
        margin-top: 100px;
    }
}
</style>
