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
  }

  onSubmit = (e) => {
    console.log(e)
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
