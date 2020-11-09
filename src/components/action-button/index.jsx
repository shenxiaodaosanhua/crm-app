import React from "react"
import Taro from "@tarojs/taro"
import {Text, View} from "@tarojs/components"
import {
  AtFab,
} from "taro-ui"
import {acceptWork} from "../../servers/servers"


export default class ActionButton extends React.Component {
  accept() {
    let id = this.props.id
    acceptWork({
      'work_id': id,
    }).then(() => {
      this.showToast('接单成功', 'success')
    }).catch(error => {
      this.showToast(error.data.message)
    })
  }

  showToast(title, icon = 'none') {
    Taro.showToast({
      title: title,
      icon: icon,
      duration: 2000
    })
  }

  reserve() {
    let id = this.props.id
    Taro.navigateTo({
      url: '/pages/reserve/index?id=' + id,
    })
  }

  fulfill() {
    let id = this.props.id
    Taro.navigateTo({
      url: '/pages/fulfill/index?id=' + id,
    })
  }

  assign() {
    let id = this.props.id
    Taro.navigateTo({
      url: '/pages/assign/index?id=' + id,
    })
  }

  render() {
    return (
      <View className='at-row'>
        <View className='at-col'>
          <AtFab
            className='fab'
            onClick={this.reserve.bind(this)}
          >
            <Text>预约</Text>
          </AtFab>
          <AtFab
            className='fab'
            onClick={this.fulfill.bind(this)}
          >
            <Text>完成</Text>
          </AtFab>
        </View>
        <View className='at-col at-col__offset-8'>
          <AtFab
            className='fab'
            onClick={this.accept.bind(this)}
          >
            <Text>接单</Text>
          </AtFab>
          <AtFab
            className='fab'
            onClick={this.assign.bind(this)}
          >
            <Text>派单</Text>
          </AtFab>
        </View>
      </View>
    )
  }
}
