import React from "react"
import Taro from '@tarojs/taro'
import {
  View
} from "@tarojs/components"
import {
  AtList,
  AtListItem,
  AtDivider,
} from "taro-ui"
import Footer from "../../components/footer"
import './index.less'

export default class My extends React.Component {

  loginOut() {
    Taro.setStorageSync('Authorization', '')
    Taro.redirectTo({
      url: '/pages/auth/login'
    })
  }

  render() {
    return (
      <View className='warp'>
        <AtList
          hasBorder={false}
        >
          <AtDivider content='业务' />
          <AtListItem
            title='我的业绩'
            arrow='right'
          />
          <AtListItem
            title='分享'
            arrow='right'
          />
          <AtDivider content='用户' />
          <AtListItem
            title='退出'
            arrow='right'
            onClick={this.loginOut.bind(this)}
          />
        </AtList>
        <Footer />
      </View>
    )
  }
}
