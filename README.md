代码按模块划分，每个模块专注自己的功能，而不是面向过程，于是需要 webpack
将所有模块打包在一个文件中，让这个文件被 index.html 文件引入就可以了
webpack 能翻译所有方式引入的语法，ES Module、 commonjs、 AMD、 CMD
webpack 原始只能打包 js 文件，生产 js 文件，如果碰到不是 js 的文件就看配置文件中用什么 loader 打包
webpack 的入口是 index.js 而不是 index.html
webpack 打包的位置始终是当前位置的根目录（./dist），不管入口文件在多么深的文件夹中
loader: 某种特定格式的打包文件,执行从右往左执行
source-map: 是打包文件和源文件的映射,配置 devtool 项,production 默认关闭。dist 目录下会出现一个 main.js.map。但是报错返回的是 main.js 的行数
inline-source-map: 打包到 main.js 文件中（base64），不会出现 main.js.map 文件。但是报错返回的是源文件的行数
cheap-inline-source-map: 报错返回的是源文件的行数，inline-source-map 报错会精确到哪一行的哪一个字符。cheap 是只返回行就好了，而且只会管业务代码的报错，不会管第三方模块和 loader 等的报错，性能会好。
cheap-module-source-map：会管第三方模块和 loader 等的报错， production 环境推荐。
cheap-module-eval-source-map： 以 eval 的方式生产 map 文件，不会有 main.js.map，也不会有 base64 文件,速度最快， development 环境推荐
指令注解

```sh
npx webpack -v： npx 本项目下的 webpack 命令
npm info webpack： webpack 的版本号
npm install webpack@版本号
# 在package中配置的指令不用带npx，本项目的webpack的优先级比全局的高
npx webpack index.js： 以谁为入口打包
npx webpack --config webpack.config.js： 以 webpack.config.js为配置文件打包, webpack.config.js为默认的文件，可以省略 npx webpack
path.resolve(__dirname, 'bundle')： __dirname指引入path所在的文件所在的目录
entry: './src/index.js'： 是 entry: {main: './src/index.js'}的简写，入口文件有一个对应的名字,在所有的需要配置名称的地方中[name]指的就是这个，如output中filename: [name].js
```

npm install --save-d 安装的包，包的含义

## 库

1. webpack
2. webpack-cli: 让我们可以在命令行中可以使用 webpack 的指令
3. less

## loader

1.  file-loader: 打包 jpg/png/gif 等格式的图片，
    -   原理：当发现引入了图片，会把图片移动到 dist 目录下，然后得到一个打包之后的名称（地址），并将名称作为返回值返回到引入图片的文件(edbd0e4ee009654a18027f6a6a137a8e.jpg)。
    -   name：如果希望打包后的名字不变，就配置 loader 的 options: {name: '[name].[ext]'} 还可以加 hash
    -   路径：如果希望打包之后的位置在 dist/images 就配置 options: {outputPath: 'images/'} (images/lyr.jpg)
2.  url-loader: 功能和 file-loader 相同，只是会把图片打包成 base64,返回的也是 base64,如果要大于某个 size 以 file-loader 的方式打包需要配置 options: {limit: 2048}
3.  less-loader: 把 less 语法翻译成 css 语法
4.  css-loader: 分析出几个 css 文件的关系，并把分析后的文件合并成同一个文件
    -   importLoaders: 2 ==> less 文件中引入 less 文件，因为层级文件，子 less 文件不会用 css 之前的 loader 打包，配置完之后就可以了。有可能会出现这种情况。
    -   modules: css 的模块化打包 options: {modules: true}。import style from 'xxx.less'。 console.log(style) 的结果{.cssname: '一堆码'}，modules 为 false 的时候结果为空对象
5.  style-loader: 得到 css-loader 分析合并的文件后，把 css 文件挂载到 html 文件的 head 中
6.  less 文件用：style-loader,css-loader,less-loader 不起作用，替换成 MiniCssExtractPlugin 之后报错 Unexpected token import
7.  postcss-loader: 自动添加厂商前缀插件可以写在这里
8.  autoprefixer: 自动添加厂商前缀
9.  iconfont: 用 file-loader 打包
10. babel-loader: 帮助 webpack 做打包的工具，webpack 和 babel 的桥梁，两者做了打通，但是并不会把 es5 的语法转成 es6 的语法。@babel/preset-env 是把 es5 的语法转成 es6 的语法的。

    -   配置项 options 可以写在.babelrc 文件中

11. @babel/core: babel 的核心库，让 babel 去识别 js 代码里的内容，把 js 代码转换成抽象语法树，再把语法树编译转化成新的语法出来。
12. @babel/preset-env： 把 es5 的语法转成 es6 的语法的(但是不全)，babel-loader 的 options 配置{presets: ["@babel/preset-env"]}。还需要把缺失的补充到低版本里。
13. @babel/polyfill: 补充@babel/preset-env 翻译语法的不全，安装之后要在业务文件中引入。会全部打包到 main.js 中

        - 按需加载需要配置 babel-loader 的 options: {presets: [["@babel/preset-env", {useBuiltIns: 'usage'}]]}。
        - useBuiltIns: 'usage'这个会报错，import '@babel/polyfill'会报错, 需要安装 core-js@2,core-js@3
        - 会污染全局环境（写业务项目没有问题，但是库项目就不可以了。babel/plugin-transform-runtime，以闭包的形式引入，配合使用@babel/runtime 和@babel/runtime-corejs2）

    [https://www.babeljs.cn/docs/babel-plugin-transform-runtime](官网)

14. @babel/preset-react: 解析 react 里的 jsx 语法

## plugins

可以在 webpack 运行的某个时刻，帮你做一些事情

1. html-webpack-plugin: 会在打包结束之后自动生成一个 html 文件，并把打包生成的 js 自动引入到这个文件中
    - template: 插件接收一个模版 index.html 标签（但是没有 id 为 root 的 div 标签，可配置的模版）
    - 生成的文件引入的 js 的默认是同级目录下的 js 文件，如果想引入别的文件夹或者别的域名下的文件，需要在 output 下配置 publicPath
    - 当 entry 是多个的时候，会在生成的 index.html 文件中引入多个 js 文件，但是只有一个 html 文件
    - 如果想多个 html 文件就要多个实例(每个实例必须配置对应的 filename，否则是只会打出一个 html 文件)，但是每个文件都是默认全部引入多个 js 文件
    - 想要对应的 html 文件引入对应的 js 文件需配置
2. clean-webpack-plugin: 在 webpack 打包之前删除之前打包的文件
3. webpack-dev-server: 直接在 webpack.config.js 中配置 devServer 项就可以了
    - 只配置{contentBase: './dist'},看不到东西,有可能是 output 的 publicPath 的问题,不配或者配置成 '/'就可以了
    - webpack-dev-server 打包的文件不会放在 dist 目录里面，只会放到内存中
    - 每次打包更新代码都会刷新页面，使用热模块更新可以解决
    - 热模块更新: 要配置{hot: true, hotOnly: true}, 同时使用插件 webpack.HotModuleReplacementPlugin()
    - 热模块更新: 改了 css 内容，只会替换 css 内容，不会体会 js 内容
    - 热模块更新: 改了 js 代码之后不刷新了但是，内容也没有替换。可以手动的写一些函数让它替换 if(module.hot) {module.hot.accept('index.js', () => {
      当 index.js 更改之后就会执行这段代码
      })}，但是特别不好。css 就不用，原因是 css-loader 已经实现了这段代码。vue-loader 也内置了，react 借助了一下 babel-preset 也实现了这种功能。如果是纯数据的 loader 没有内置就需要写这段代码
