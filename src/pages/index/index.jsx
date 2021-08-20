import React, {
  Component,
} from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import {
  getWorksData,
  getMy,
} from '../../servers/servers'
import Work from '../../components/work'
import Footer from '../../components/footer'
import './index.less'

export default class Index extends Component {

  state = {
    data: [],
    user: null,
    orderKey: 'created_at',
    direction: 'desc',
  }

  componentDidMount () {
    getWorksData({
      key: this.state.orderKey,
      direction: this.state.direction,
    }).then(result => {
      this.setState({
        data: result.data,
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        duration: 2000
      })
    })

    getMy().then(result => {
      let member = result.data
      Taro.setStorageSync('my', member)
      this.setState({
        user: member,
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        duration: 2000
      })
    })
  }

  getWorkDataOrder(key) {
    let direction
    if (this.state.orderKey == key && this.state.direction == 'asc') {
      direction = 'desc'
    } else {
      direction = 'asc'
    }

    getWorksData({
      key: key,
      direction: direction,
    }).then(result => {
      this.setState({
        data: result.data,
        orderKey: key,
        direction: direction
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        duration: 2000
      })
    })
  }



  render () {
    let works = this.state.data
    let user = this.state.user
    if (user && user.roles === 1) {
      Taro.redirectTo({
        url: '/pages/my/index'
      })
    }

    return (
      <View className='warp'>
        <View className='at-row'>
          <AtButton className='at-col' onClick={this.getWorkDataOrder.bind(this, "created_at")}>创建时间</AtButton>
          <AtButton className='at-col' onClick={this.getWorkDataOrder.bind(this, "reserve_at")}>预约时间</AtButton>
          <AtButton className='at-col' onClick={this.getWorkDataOrder.bind(this, "finished_at")}>超时时间</AtButton>
        </View>
        {
          works.map((item, index) => <Work item={item} itemId={index} />)
        }
        <Footer />
      </View>
    )
  }
}
