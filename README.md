## 协议

[MIT](https://github.com/quewen08/weapp-hexo-trover/blob/master/LICENSE) License

## 环境相关

* nodejs
* Taro v3.4.3
* hexo blog
* 插件：[hexo-generator-restful-zhaoo](https://github.com/zhaoo/hexo-generator-restful-zhaoo) (Hexo RESTful 接口)

> 其中修改了page语法

### Build

注册微信小程序，修改 `/project.config.json` 文件中的 `appid` 字段，匹配小程序配置。

修改 `/client/config.json` 文件中的配置。

```bash
$ npm install -g @tarojs/cli@3.4.3  // 安装 Taro
$ npm run build:weapp  // 打包
```

使用微信开发者工具打开 `weapp-hexo-trover` 目录，上传代码完成发布。