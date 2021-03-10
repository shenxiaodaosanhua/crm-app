import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Image,
  Text,
  Button,
} from "@tarojs/components"
import {
  AtTag,
  AtButton,
  AtModalContent,
  AtModalAction,
  AtModal,
} from 'taro-ui'
import {
  getProductInfo,
  getProductShareQrCode,
} from "../../servers/servers"
import { getCurrentInstance } from '@tarojs/taro'
import Footer from "../../components/footer"
import './info.less'

export default class Info extends React.Component {

  state = {
    product: {},
    loading: false,
    imageUrl: '',
  }

  componentWillMount() {
    let params = getCurrentInstance().router.params
    getProductInfo(params.id).then(result => {
      this.setState({
        product: result.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  shareProduct(id) {
    this.setState({
      loading: true,
    })
    getProductShareQrCode(id).then(result => {
      let _this = this
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
            title: '保存成功',
            icon: 'success',
            duration: 3000,
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

  shareImage() {
    Taro.showShareMenu({
      withShareTicket: true
    })

  }

  closeShare() {
    this.setState({
      loading: false,
    })
  }

  render() {
    let product = this.state.product,
      isLoading = this.state.loading
    return (
      <View className='warp'>
        <View className='info'>
          <View
            className='at-row at-row__justify--center'
          >
            <Image
              src={product.image}
              className='image'
            />
          </View>
          <View className='text borderTop'>
            <Text className='title'>{product.name}</Text>
            <AtTag
              type='primary'
              size='small'
              circle
              active='true'
              className='tag'
            >{product.brand}</AtTag>
          </View>
          <View className='text'>
            <Text className='title'>
              商品价格:
              <Text className='red-color'>{product.price}</Text>
            </Text>
          </View>
          <View className='text'>
            <Text className='title'>
              分润金额:
              <Text className='red-color'>{product.share_price}</Text>
            </Text>
          </View>
          <AtButton
            type='primary'
            className='button'
            disabled={isLoading}
            loading={isLoading}
            onClick={this.shareProduct.bind(this, product.id)}
          >分享</AtButton>
        </View>
        <Footer />
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
            >保存相册</Button>
            <Button
              openType='share'
              // onClick={this.shareImage.bind(this)}
            >分享</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
