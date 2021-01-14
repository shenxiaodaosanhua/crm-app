import React from "react"
import Taro from '@tarojs/taro'
import {
  AtDivider,
} from 'taro-ui'
import {
  Form,
  Input,
  View,
  Button,
} from "@tarojs/components"
import {
  getToken,
  login,
} from '../../servers/servers'
import './login.less'
import IconFont from "../../components/iconfont"

export default class Login extends React.Component {
  state = {
    loading: false
  }


  onSubmit = (e) => {
    this.setState({
      loading: true
    })
    let username = e.detail.value.username,
      password = e.detail.value.password

    if ((! username) || (! password)) {
      this.setState({
        loading: false
      })

      Taro.showToast({
        title: '请输入账号密码',
        icon: 'none',
        duration: 3000,
      })
      return
    }

    Taro.showLoading({
      title: '正在登录...'
    })
    login({
      username: e.detail.value.username,
      password: e.detail.value.password,
    }).then(result => {
      Taro.setStorageSync('Authorization', result.data.token)
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  wechatLogin() {
    Taro.showLoading({
      title: '正在登录...'
    })
    Taro.login({
      success: this.loginCode
    })
  }

  loginCode = (result) => {
    Taro.hideLoading()
    if (! result.code) {
      Taro.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000,
      })
      return
    }

    getToken({
      code: result.code
    }).then(res => {
      Taro.setStorageSync('Authorization', res.data.token)
      Taro.hideLoading()

      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }).catch(error => {
      Taro.hideLoading()

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
        <Form
          onSubmit={this.onSubmit}
          className='form'
        >
          <Input
            type='number'
            name='username'
            placeholder='请输入手机号码'
            className='input'
          />
          <Input
            type='password'
            name='password'
            password
            placeholder='请输入密码'
            className='input'
          />
          <Button
            type='primary'
            formType='submit'
            className='button'
            loading={this.state.loading}
          >登录</Button>
        </Form>
        <AtDivider content='第三方登录' />
        <View className='at-row at-row__justify--center'>
          <View
            className='at-col at-col-2'
            onClick={this.wechatLogin.bind(this)}
          >
            <IconFont
              name='weixin'
              size={80}
            />
          </View>
        </View>
      </View>
    )
  }
}
