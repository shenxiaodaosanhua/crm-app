import React, {
  Component,
} from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
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
    meta: null,
    user: null,
  }

  componentDidMount () {
    getWorksData().then(result => {
      this.setState({
        data: result.data,
        meta: result.meta,
      })
    }).catch(error => {
      console.log(error)
    })

    getMy().then(result => {
      let member = result.data
      Taro.setStorageSync('my', member)
      this.setState({
        user: member,
      })
    }).catch(error => {
      console.log(error)
    })
  }

  onReachBottom() {
    let meta = this.state.meta
    if (meta.current_page === meta.last_page) {
      return;
    }
    Taro.showLoading({
      title: '加载中...',
    })

    getWorksData({
      page: (meta.current_page + 1),
    }).then(result => {
      this.setState({
        data: [...result.data, ...result.data],
        meta: result.meta,
      })
      Taro.hideLoading()
    }).catch(error => {
      Taro.hideLoading()
      console.log(error)
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
        {
          works.map(item => <Work item={item} />)
        }
        <Footer />
      </View>
    )
  }
}
