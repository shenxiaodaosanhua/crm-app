import React from "react"
import Taro from '@tarojs/taro'
import {AtTabBar} from "taro-ui"

export default class Footer extends React.Component {

  state = {
    user: null,
  }

  componentDidMount() {
    let member = Taro.getStorageSync('my')
    this.setState({
      user: member
    })
  }

  handleClick (value) {
    let member = this.state.user
    if (member.roles === 1) {
      Taro.redirectTo({
        url: '/pages/my/index'
      })
      return
    }

    Taro.setStorageSync('menuCurrent', value)

    switch (value) {
      case 0:
        Taro.redirectTo({
          url: '/pages/index/index',
        })
        break
      case 1:
        Taro.redirectTo({
          url: '/pages/my/index'
        })
        break
      default:
        Taro.redirectTo({
          url: '/pages/index/index',
        })
    }
  }

  render() {
    let menu = Taro.getStorageSync('menu'),
      menuCurrent = Taro.getStorageSync('menuCurrent'),
      user = this.state.user

    if (user && user.roles === 1) {
      return ''
    }

    return (
      <AtTabBar
        fixed
        tabList={menu}
        onClick={this.handleClick.bind(this)}
        current={menuCurrent}
      />
    )


  }
}
