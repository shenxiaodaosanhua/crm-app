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
    user: null,
  }

  componentDidMount () {
    getWorksData().then(result => {
      this.setState({
        data: result.data,
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
          works.map((item, index) => <Work item={item} itemId={index} />)
        }
        <Footer />
      </View>
    )
  }
}
