const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    env: {
        NODE_ENV: '"production"',
    },
    defineConstants: {},
    mini: {
        webpackChain(chain, webpack) {
            chain.merge({
                plugin: {
                    install: {
                        plugin: TerserPlugin,
                        args: [
                            {
                                terserOptions: {
                                    compress: true, // 默认使用terser压缩
                                    // ecma: undefined,
                                    warnings: false,
                                    parse: {},
                                    // compress: {
                                    //     drop_console: true,
                                    //     drop_debugger: false,
                                    //     pure_funcs: ['console.log'], // 移除console
                                    // },
                                },
                            },
                        ],
                    },
                },
            })
        },
    },
    h5: {
        /**
         * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
         * 参考代码如下：
         * webpackChain (chain) {
         *   chain.plugin('analyzer')
         *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
         * }
         */
    },
}
