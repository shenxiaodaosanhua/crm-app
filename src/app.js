import { Component } from 'react'
import 'taro-ui/dist/style/index.scss'
import Taro from "@tarojs/taro";

class App extends Component {

  componentDidMount () {
    let menu = [
      { title: '首页', iconType: 'home', },
      { title: '我的', iconType: 'user', }
    ],
      menuCurrent = 0
    Taro.setStorageSync('menu', menu)
    Taro.setStorageSync('menuCurrent', menuCurrent)
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
