import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Text,
} from "@tarojs/components"
import Footer from "../../components/footer"
import User from '../../components/my/user'
import Business from '../../components/my/business'
import Wechat from '../../components/my/wechat'
import './index.less'

export default class My extends React.Component {

  state = {
    my: {},
  }

  componentWillMount() {
    let user = Taro.getStorageSync('my')
    this.setState({
      my: user,
    })
  }

  render() {
    let my = this.state.my

    return (
      <View className='warp'>
        <View className='at-row at-row__justify--center'>
          <View>
            {this.state.my.name}
          </View>
        </View>
        <View className='at-row at-row__justify--center'>
          <View className='at-article__p'>
            当前余额:<Text className='amount'>{my.balance}</Text>
          </View>
          <View className='at-article__p'>
            冻结金额:{my.freeze_amount}
          </View>
        </View>

        <Business my={my} />
        {
          my.level < 3 ? (
            <User my={my} />
          ) : ''
        }


        <Wechat my={my} />
        <Footer />

      </View>
    )
  }
}
