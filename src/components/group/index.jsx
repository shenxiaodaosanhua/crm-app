import React, { Component } from 'react'
import { View } from '@tarojs/components'

export default class Group extends Component {

  render() {
    let user = this.props.user

    return (
      <View className='at-row at-article__p'>
        <View className='at-col'>名字：{user.name}</View>
        <View className='at-col'>联系电话:{user.mobile}</View>
      </View>
    )
  }
}
