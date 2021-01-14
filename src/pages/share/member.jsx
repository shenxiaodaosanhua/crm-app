import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Image,
} from "@tarojs/components"
import {
  AtList,
  AtListItem,
  AtDivider,
  AtModal,
} from "taro-ui"
import {
  bindUserWechat,
  getMemberQr,
} from "../../servers/servers"
import Footer from "../../components/footer"

export default class Member extends React.Component {

  state = {
    memberImage: ""
  }

  componentDidMount() {
    getMemberQr().then(result => {
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
            src={this.state.memberImage}
        />
        <Footer />
      </View>
    )
  }
}
