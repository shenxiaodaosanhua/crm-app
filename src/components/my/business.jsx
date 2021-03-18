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
  getMemberQr, getProductShareQrCode,
} from "../../servers/servers"

export default class Businesss extends React.Component {

  state = {
    isOpened: false,
    loading: false,
    imageUrl: '',
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
    getProductShareQrCode().then(result => {
      let _this = this
      this.setState({
        loading: true,
      })

      Taro.downloadFile({
        url: result.data.url,
        success: function (res) {
          if (res.statusCode === 200) {
            console.log(res.tempFilePath)
            _this.setState({
              imageUrl: res.tempFilePath
            })
          }
        }
      })
    })
  }

  saveImage() {
    Taro.saveImageToPhotosAlbum({
      filePath: this.state.imageUrl,
      success: res => {
        if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
          Taro.showToast({
            title: '请分享相册小程序码',
            icon: 'success',
            duration: 5000,
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 3000,
        })
      }
    })
  }

  myWork() {
    Taro.navigateTo({
      url: '/pages/my/my-work',
    })
  }

  render() {
    return (
      <View>
        <AtList
          hasBorder={false}
        >
          <AtDivider content='业务' />
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
        <AtModal
          isOpened={this.state.loading}
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
              onClick={this.saveImage.bind(this)}
            >保存到相册</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
