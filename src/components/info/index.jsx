import React from "react"
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";

export default class Info extends React.Component {

  onPhone(item) {
    Taro.makePhoneCall({
      phoneNumber: item.mobile
    })
  }

  render() {
    let work = this.props.work
    return (
      <View className='work-info'>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>客户名称:</View>
          <View className='at-col value'>{work.name}</View>
        </View>
        <View className='at-row info-list' onClick={this.onPhone.bind(this, work)}>
          <View className='at-col at-col-3 at-col--auto key'>客户电话:</View>
          <View className='at-col value'>{work.mobile}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>客户地址:</View>
          <View className='at-col value'>{work.address}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>状态:</View>
          <View className='at-col value'>{work.state}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>地区:</View>
          <View className='at-col value'>{work.area}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>分类:</View>
          <View className='at-col value'>{work.category}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>产品:</View>
          <View className='at-col value'>{work.product}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>留言:</View>
          <View className='at-col value at-col--wrap'>{work.remark}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>创建时间:</View>
          <View className='at-col value'>{work.created_at}</View>
        </View>
      </View>
    )
  }
}
