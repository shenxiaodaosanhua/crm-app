import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.less'

export default class UserWork extends Component {

  onPhone(item) {
    Taro.makePhoneCall({
      phoneNumber: item.mobile
    })
  }

  hrefInfo() {
    Taro.navigateTo({
      url: '/pages/info/index?id=' + this.props.item.id
    })
  }

  render() {
    let work = this.props.item

    return (
      <View className='item'>
        <AtCard
          note={'生成时间:' + work.created_at}
          extra={work.state}
          title={work.category}
          onClick={this.hrefInfo.bind(this)}
        >
          <View className='item-content'>称呼:{work.name}</View>
          <View className='item-content'>发展人:{work.parent.name}</View>
        </AtCard>
      </View>
    )
  }
}
