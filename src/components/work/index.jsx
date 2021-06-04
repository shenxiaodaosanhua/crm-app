import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.less'

export default class Work extends Component {

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
    let work = this.props.item,
      index = (this.props.itemId) + 1

    return (
      <View className='item'>
        <AtCard
          note={'生成时间:' + work.created_at}
          extra={work.state}
          title={work.category}
          onClick={this.hrefInfo.bind(this)}
        >
          <View className='item-content'>序号:{index}</View>
          <View className='item-content'>称呼:{work.name}</View>
          <View className='item-content'>电话:{work.mobile}</View>
          <View className='item-content'>地址:{work.address}</View>
          <View className='item-content'>预约时间:{work.reserve_at}</View>
          <View className='item-content'>完成时间:{work.accept_at}</View>
          <View className='item-content'>产品:{work.product}</View>
          <View className='item-content'>品牌:{work.brand}</View>
          <View className='item-content'>地区:{work.area}</View>
        </AtCard>
      </View>
    )
  }
}
