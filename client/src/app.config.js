export default {
    pages: [
        'pages/home/index',
        'pages/postDetail/postDetail',
        'pages/my/index',
        'pages/laboratory/index',
        'pages/history/index',
        'pages/about/index',
    ],
    lazyCodeLoading: 'requiredComponents',
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
    },
    tabBar: {
        color: '#666666',
        selectedColor: '#33333D',
        backgroundColor: '#fafafa',
        borderStyle: 'black',
        list: [
            {
                pagePath: 'pages/home/index',
                iconPath: './assets/tabbar/home.png',
                selectedIconPath: './assets/tabbar/home-active.png',
                text: '首页',
            },
            // {
            //     pagePath: 'pages/galleries/galleries',
            //     iconPath: './assets/tabbar/image.png',
            //     selectedIconPath: './assets/tabbar/image-active.png',
            //     text: '相册',
            // },
            {
                pagePath: 'pages/my/index',
                iconPath: './assets/tabbar/my.png',
                selectedIconPath: './assets/tabbar/my-active.png',
                text: '我的',
            },
        ],
    },
    usingComponents: {
        towxml: 'components/towxml/towxml',
    },
}
