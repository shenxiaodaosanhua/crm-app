import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Image,
  Text,
  Button,
} from "@tarojs/components"
import {
  AtTag
} from 'taro-ui'
import {
  getProductInfo,
} from "../../servers/servers"
import { getCurrentInstance } from '@tarojs/taro'
import Footer from "../../components/footer"
import './info.less'

export default class Info extends React.Component {

  state = {
    product: {},
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

  render() {
    let product = this.state.product
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
          <Button
            className='button'
            openType='share'
            type='primary'
          >
            分享
          </Button>
        </View>
        <Footer />
      </View>
    )
  }
}