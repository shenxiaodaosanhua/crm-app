import React, {
  Component,
} from 'react'
import { View } from '@tarojs/components'
import {getWorksData} from '../../servers/servers'
import Work from '../../components/work'
import Footer from '../../components/footer'
import './index.less'

export default class Index extends Component {

  state = {
    data: [],
  }

  componentWillMount () {
    getWorksData().then(result => {
      this.setState({
        data: result.data
      })
    }).catch(error => {
      console.log(error)
    })


  }



  render () {
    let works = this.state.data

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
