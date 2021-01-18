import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
} from "@tarojs/components"
import {
  getMyBalanceLog,
} from '../../servers/servers'
import BalanceLog from '../../components/balance-log'
import './index.less'

export default class Balance extends React.Component {
  state = {
    log: [],
  }

  componentWillMount() {
    Taro.showLoading({
      title: '加载中...',
    })

    getMyBalanceLog().then(result => {
      this.setState({
        log: result.data,
      })
      Taro.hideLoading()
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  render() {
    let logs = this.state.log
    return (
      <View className='warp'>
        {
          logs.map(log => <BalanceLog log={log} />)
        }
      </View>
    )
  }
}
