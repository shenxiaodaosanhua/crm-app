import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
  Image,
  Text,
} from '@tarojs/components'
import {
  AtCard,
  AtButton,
} from 'taro-ui'

import './index.less'


export default class ProductList extends Component {

  productInfo(id) {
    Taro.navigateTo({
      url: '/pages/product/info?id=' + id
    })
  }

  render() {
    let product = this.props.product
    return (
      <View className='at-col at-col-6 product-item'>
        <AtCard
          extra={product.brand}
          title={product.name}
        >
          <View className='at-row at-row__justify--center'>
            <Image
              src={product.image}
              className='product-image'
              aspectFit='aspectFit'
            />
          </View>
          <View className='text-view'>价格：<Text className='text'>{product.price}</Text></View>
          <View className='text-view'>分润金额:<Text className='text'>{product.share_price}</Text></View>
          <AtButton
            type='primary'
            size='small'
            onClick={this.productInfo.bind(this, product.id)}
          >查看详情</AtButton>
        </AtCard>
      </View>
    )
  }
}
