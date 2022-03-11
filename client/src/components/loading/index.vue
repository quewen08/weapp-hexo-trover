<template>
    <view class="loading">
        <image :src="loading" mode="center" />
    </view>
</template>

<script>
import loading from '@/assets/images/loading.gif'

export default {
    data() {
        return {
            loading: loading,
        }
    },
}
</script>

<style lang="scss">
.loading {
    height: 100vh;
    left: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    z-index: 2000;

    image {
        height: inherit;
    }
}
</style>
