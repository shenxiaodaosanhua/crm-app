import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Image,
  Button,
} from "@tarojs/components"
import {
  AtList,
  AtListItem,
  AtDivider,
  AtModal,
  AtModalContent,
  AtModalAction,
} from "taro-ui"
import {
  getUserQr,
} from "../../servers/servers"

export default class User extends React.Component {

  state = {
    isOpened: false,
    imageUrl: "",
  }

  myUserGroup() {
    Taro.navigateTo({
      url: '/pages/group/count',
    })
  }

  userOpened() {
    Taro.showLoading({
      title: '加载中...'
    })
    getUserQr().then(result => {
      this.setState({
        isOpened: true,
        imageUrl: result.data.url,
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

  closeShare() {
    this.setState({
      isOpened: false,
      imageUrl: '',
    })
  }

  render() {
    let my = this.props.my
    return (
      <AtList
        hasBorder={false}
      >
        <AtDivider content='员工' />
        <AtListItem
          title='我的小伙伴'
          arrow='right'
          onClick={this.myUserGroup.bind(this)}
        />
        <AtListItem
          title='发展小伙伴'
          arrow='right'
          onClick={this.userOpened.bind(this)}
        />

        <AtModal
          isOpened={this.state.isOpened}
        >
          <AtModalContent>
            <View className='at-row at-row__justify--center'>
              <Image
                style='width: 180px;height: 180px;'
                src={this.state.imageUrl}
              />
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button
              onClick={this.closeShare.bind(this)}
            >关闭</Button>
          </AtModalAction>
        </AtModal>
      </AtList>
    )
  }
}
