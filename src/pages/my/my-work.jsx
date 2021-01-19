import React, {
  Component,
} from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
  getMyWork,
} from '../../servers/servers'
import Work from '../../components/work'
import Footer from '../../components/footer'
import './my-work.less'

export default class MyWork extends Component {
  state = {
    works: [],
  }

  componentWillMount() {
    getMyWork().then(result => {
      this.setState({
        works: result.data,
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    let works = this.state.works
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
