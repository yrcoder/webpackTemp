代码按模块划分，每个模块专注自己的功能，而不是面向过程，于是需要 webpack
将所有模块打包在一个文件中，让这个文件被 index.html 文件引入就可以了
webpack 能翻译所有方式引入的语法，ES Module、 commonjs、 AMD、 CMD
webpack 原始只能打包 js 文件，生产 js 文件，如果碰到不是 js 的文件就看配置文件中用什么 loader 打包
webpack 的入口是 index.js 而不是 index.html
webpack 打包的位置始终是当前位置的根目录（./dist），不管入口文件在多么深的文件夹中
loader: 某种特定格式的打包文件,执行从右往左执行

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

1. webpack
2. webpack-cli: 让我们可以在命令行中可以使用 webpack 的指令
3. file-loader: 打包 jpg/png/gif 等格式的图片，
    - 原理：当发现引入了图片，会把图片移动到 dist 目录下，然后得到一个打包之后的名称（地址），并将名称作为返回值返回到引入图片的文件(edbd0e4ee009654a18027f6a6a137a8e.jpg)。
    - name：如果希望打包后的名字不变，就配置 loader 的 options: {name: '[name].[ext]'} 还可以加 hash
    - 路径：如果希望打包之后的位置在 dist/images 就配置 options: {outputPath: 'images/'} (images/lyr.jpg)
4. url-loader: 功能和 file-loader 相同，只是会把图片打包成 base64,返回的也是 base64,如果要大于某个 size 以 file-loader 的方式打包需要配置 options: {limit: 2048}
5. less-loader: 把 less 语法翻译成 css 语法
6. css-loader: 分析出几个 css 文件的关系，并把分析后的文件合并成同一个文件
    - importLoaders: 2 ==> less 文件中引入 less 文件，因为层级文件，子 less 文件不会用 css 之前的 loader 打包，配置完之后就可以了。有可能会出现这种情况。
    - modules: css 的模块化打包
7. style-loader: 得到 css-loader 分析合并的文件后，把 css 文件挂载到 html 文件的 head 中
8. less: 包
9. less 文件用：style-loader,css-loader,less-loader 不起作用，替换成 MiniCssExtractPlugin 之后报错 Unexpected token import
10. postcss-loader: 自动添加厂商前缀插件可以写在这里
11. autoprefixer: 自动添加厂商前缀
