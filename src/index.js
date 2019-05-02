// 引入文件--模块化
// import Header from './views/header'
// import Content from './views/content'
// new Header()
// new Content()

// 引入图片
// import lyr from './images/lyr.jpg'
// console.log(lyr)

// 模块化样式
// import style from './styles/a.less'
// console.log(style, 'modules === true')

// iconfont(不知为何引用报错),私自删除了base64的代码
// import './styles/iconfont.css'
// var dom = document.getElementById('root')
// dom.innerHTML = '<div class="iconfont icon-back"></div>'

// 模块热更新
// import './styles/index.less'
// function aaa() {
// 	var div = document.createElement('div')
// 	div.className = 'item'
// 	div.innerHTML = 'item'
// 	document.body.appendChild(div)
// }
// // aaa()
// var btn = document.createElement('button')
// btn.innerHTML = '新建'
// document.body.appendChild(btn)
// btn.onclick = aaa

// babel
// const a = [1, 2, 3]
// const b = a.map(item => {
// 	return {
// 		index: item,
// 		name: '李月茹',
// 	}
// })

// React
// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// class App extends Component {
// 	render() {
// 		return <div>111</div>
// 	}
// }
// ReactDOM.render(<App />, document.getElementById('root'))

// Tree Shaking
// import { add } from './utils/index.js'

// const a = add(1, 2)
// console.log(a)

// code Splitting
// 静态引入lodash
// import _ from 'lodash'
// console.log(_.join(['a', 'b', 'c'], '---'))
// 动态引入lodash（打包生成的文件名叫vendors～lodash.js）
// function getComponent() {
// 	return import(/* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ 'lodash').then(({ default: _ }) => {
// 		var ele = document.createElement('div')
// 		ele.innerHTML = _.join(['a', 'b'], '--')
// 		return ele
// 	})
// }
// document.addEventListener('click', () => {
// 	getComponent().then(ele => {
// 		document.body.appendChild(ele)
// 	})
// })

// resolve
// import { add } from 'utils'
// const a = add(1, 2)
// console.log(a)

// css代码拆分

import 'styles/index.less'
