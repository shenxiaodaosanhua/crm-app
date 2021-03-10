import React from "react"
import {
  View,
  Text,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.less'

export default class Info extends React.Component {

  onPhone(item) {
    Taro.makePhoneCall({
      phoneNumber: item.mobile
    })
  }

  copyData(value) {
    Taro.setClipboardData({
      data: value,
      success: function () {
        Taro.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 3000,
        })
      }
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
          <View className='at-col at-col-3 at-col--auto key'>预约时间:</View>
          <View className='at-col value'>{work.reserve_at}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>预计完成时间:</View>
          <View className='at-col value'>{work.finished_at}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>实际完成时间:</View>
          <View className='at-col value'>{work.accept_at}</View>
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
          <View className='at-col at-col-3 at-col--auto key'>产品号:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.product_number)}
            >
              {work.product_number}
            </Text>
          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>证件号:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.id_number)}
            >
              {work.id_number}
            </Text>
          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>通信速率:</View>
          <View className='at-col value'>{work.rate}</View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>上网账户:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.account_username)}
            >
              {work.account_username}
            </Text>

          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>上网密码:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.account_password)}
            >
              {work.account_password}
            </Text>

          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>IPTV账户:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.iptv_username)}
            >
              {work.iptv_username}
            </Text>

          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>IPTV密码:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.iptv_password)}
            >
              {work.iptv_password}
            </Text>

          </View>
        </View>

        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>分光器编码:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.splitter)}
            >
              {work.splitter}
            </Text>
          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>ONU SN号:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.onu_sn)}
            >
              {work.onu_sn}
            </Text>
          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>接入间:</View>
          <View className='at-col value'>
            <Text
              className='copy-text'
              onClick={this.copyData.bind(this, work.access)}
            >
              {work.access}
            </Text>
          </View>
        </View>
        <View className='at-row info-list'>
          <View className='at-col at-col-3 at-col--auto key'>光猫自备:</View>
          <View className='at-col value'>{work.is_mode}</View>
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
