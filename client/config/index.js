const path = require('path')

const config = {
    projectName: 'weapp-hexo-trover',
    date: '2022-3-4',
    alias: {
        '@/apis': path.resolve(__dirname, '..', 'src/apis'),
        '@/utils': path.resolve(__dirname, '..', 'src/utils'),
        '@/components': path.resolve(__dirname, '..', 'src/components'),
        '@/constants': path.resolve(__dirname, '..', 'src/constants'),
        '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    },
    sass: {
        resource: [
            path.resolve(__dirname, '..', 'src/styles/variable.scss'),
            path.resolve(__dirname, '..', 'src/styles/reset.scss'),
        ],
    },
    csso: {
        enable: true,
        config: {
            // 配置项同 https://github.com/css/csso#minifysource-options
        },
    },
    compile: {
        // 跳过编译
        // exclude: [path.resolve(__dirname, '..', 'src/components/towxml/')],
    },
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
        [
            '@tarojs/plugin-framework-vue3',
            {
                mini: {
                    compilerOptions: {
                        isCustomElement: (tag) => tag.includes('towxml'),
                        whitespace: 'preserve',
                    },
                },
            },
        ],
        // '@tarojs/plugin-html',
        // '@tarojs/plugin-sass', // 使用 Sass
        // '@tarojs/plugin-less', // 使用 Less
        // '@tarojs/plugin-stylus', // 使用 Stylus
    ],
    defineConstants: {},
    copy: {
        patterns: [
            {
                from: 'src/components/towxml/',
                to: 'dist/components/towxml/',
                // ,
                // ignore: ['*.js']
            },
        ],
        options: {},
    },
    framework: 'vue3',
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {},
            },
            url: {
                enable: true,
                config: {
                    limit: 1024, // 设定转换尺寸上限
                },
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {},
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}
