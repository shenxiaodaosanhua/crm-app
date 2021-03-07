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
    my: {},
  }

  componentDidMount() {
    let params = getCurrentInstance().router.params
    let user = Taro.getStorageSync('my')

    this.setState({
      my: user,
    })

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
    let my = this.state.my

    return (
      <View className='warp'>
        <View className='title'>
          <View className='title-name'>客户信息</View>
        </View>
        <WorkInfo work={work} />
        {
          my.roles == 0 ? (
              <View>
                <View className='title'>
                  <View className='title-name'>工单信息</View>
                </View>
                <Actions actions={actions} />
              </View>
          ) : ''
        }
        {
          my.roles == 0 ? (
            <ActionButton id={work.id} />
          ) : ''
        }

      </View>
    )
  }
}
