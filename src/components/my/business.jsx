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
  getMemberQr,
} from "../../servers/servers"

export default class Businesss extends React.Component {

  state = {
    isOpened: false,
    imageUrl: "",
  }

  memberOpened() {
    Taro.showLoading({
      title: '加载中...'
    })
    getMemberQr().then(result => {
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

  shareProduct() {
    Taro.navigateTo({
      url: '/pages/share/product',
    })
  }

  myWork() {
    Taro.navigateTo({
      url: '/pages/my/my-work',
    })
  }

  render() {
    return (
      <AtList
        hasBorder={false}
      >
        <AtDivider content='业务' />
        <AtListItem
          title='我的业绩'
          arrow='right'
        />
        <AtListItem
          title='分享赚钱'
          arrow='right'
          onClick={this.shareProduct.bind(this)}
        />
        <AtListItem
          title='促成交易'
          arrow='right'
          onClick={this.myWork.bind(this)}
        />

        <AtModal
          isOpened={this.state.isOpened}
        >
          <AtModalContent>
            <View className='at-row at-row__justify--center'>
              <Image
                style='width: 180px;height: 180px;'
                src={this.state.imageUrl}
                showMenuByLongpress='true'
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
