import React from 'react'
import Taro from '@tarojs/taro'
import {
  View,
  Form,
  Button,
  Input,
} from '@tarojs/components'
import {
  postWithdraw,
} from '../../servers/servers'
import './store.less'


export default class Withdraw extends React.Component {

  state = {
    loading: false,
  }

  onSubmit = (e) => {
    this.setState({
      loading: true,
    })
    Taro.showLoading({
      title: '提交中...',
    })
    postWithdraw(e.detail.value).then(() => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/withdraw/index',
      })
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 2000,
      })
      this.setState({
        loading: false,
      })
    })
  }

  render() {

    return (
      <View
        className='warp'
      >
        <Form
          onSubmit={this.onSubmit}
          className='form'
        >
          <Input
            type='number'
            name='bank_number'
            placeholder='请输入卡号'
            className='input'
          />
          <Input
            type='number'
            name='amount'
            placeholder='请输入提现金额'
            className='input'
          />

          <Input
            type='text'
            name='name'
            placeholder='请输入开户名字'
            className='input'
          />
          <Input
            type='text'
            name='bank_name'
            placeholder='请输入银行名称'
            className='input'
          />
          <Input
            type='text'
            name='bank_address'
            placeholder='请输入开户支行'
            className='input'
          />

          <Button
            type='primary'
            formType='submit'
            className='button'
            loading={this.state.loading}
          >提现</Button>
        </Form>
      </View>
    )
  }
}
