import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Image,
} from "@tarojs/components"
import {
  getUserQr,
} from "../../servers/servers"
import Footer from "../../components/footer"

export default class Member extends React.Component {

  state = {
    memberImage: ""
  }

  componentDidMount() {
    getUserQr().then(result => {
      this.setState({
        memberImage: result.data.url,
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })

  }

  render() {
    return (
      <View className='warp'>
        <Image
          style='width: 100px;height: 100px;'
          src={this.state.memberImage}
        />
        <Footer />
      </View>
    )
  }
}
