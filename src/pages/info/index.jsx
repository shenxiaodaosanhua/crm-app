import React from "react";
import Taro from '@tarojs/taro'
import {
  View,
} from "@tarojs/components"
import {getCurrentInstance} from "@tarojs/runtime"
import {
  getWorkInfo,
} from '../../servers/servers'
import WorkInfo from '../../components/info'
import Actions from '../../components/actions'
import ActionButton from '../../components/action-button'
import './index.less'


export default class Info extends React.Component {
  state = {
    work: {},
    actions: [],
  }

  componentDidMount() {
    let params = getCurrentInstance().router.params
    getWorkInfo(params.id).then(result => {
      this.setState({
        work: result.data,
        actions: result.data.actions
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    let work = this.state.work
    let actions = this.state.actions
    return (
      <View className='warp'>
        <View className='title'>
          <View className='title-name'>客户信息</View>
        </View>
        <WorkInfo work={work} />
        <View className='title'>
          <View className='title-name'>工单信息</View>
        </View>
        <Actions actions={actions} />
        <ActionButton id={work.id} />
      </View>
    )
  }
}
