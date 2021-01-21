import React from 'react'
import Taro from '@tarojs/taro'
import {
  View,
} from '@tarojs/components'
import {
  AtButton,
  AtDivider,
} from 'taro-ui'
import './index.less'
import List from '../../components/withdraw/listt'
import {
  getWithdrawList,
} from '../../servers/servers'

export default class Withdraw extends React.Component {
  state = {
    list: [],
  }

  componentWillMount() {
    getWithdrawList().then(result => {
      this.setState({
        list: result.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  withdraw() {
    Taro.navigateTo({
      url: '/pages/withdraw/store'
    })
  }

  render() {
    let logs = this.state.list
    return (
      <View
        className='warp'
      >
        <View
          className='footer'
        >
          <AtButton
            type='primary'
            size='normal'
            onClick={this.withdraw.bind(this)}
          >立即提现</AtButton>
        </View>
        <AtDivider content='提现列表' />
        <View
          className='content'
        >
          {
            logs.map(log => <List log={log} />)
          }
        </View>
      </View>
    )
  }
}
