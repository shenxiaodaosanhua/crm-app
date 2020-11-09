import React, {Component} from 'react'
import Taro from '@tarojs/taro'
import {
  AtForm,
  AtInput,
  AtButton,
} from 'taro-ui'
import {
  login,
  bindUserWechat
} from '../../servers/servers'
import {getCurrentInstance} from "@tarojs/runtime"
import './index.less'

export default class Wechat extends Component {

  state = {
    username: '',
    password: '',
    wechatCode: '',
  }

  componentWillMount() {
    this.getWechatCode()
  }

  handleChangeUsername = e => {
    this.setState({
      username: e
    })
    return e
  }

  handleChangePassword = e => {
    this.setState({
      password: e
    })
    return e
  }

  //登录
  onSubmit() {
    if ((! this.state.username) || (! this.state.password)) {
      Taro.showToast({
        title: '请输入账号和密码',
        icon: 'none',
        duration: 2000,
      });
    }

    Taro.showLoading({
      title: '正在登录...'
    })

    login({
      username: this.state.username,
      password: this.state.password,
    }).then(this.login).catch(this.loginErr)
  }

  login = (result) => {
    Taro.setStorageSync('Authorization', result.data.token)

    let params = getCurrentInstance().router.params

    bindUserWechat({
      code: this.state.wechatCode
    }).then((user) => {
      Taro.setStorageSync('user', user)
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/' + params.path
      })
    }).catch(bindErr => {
      Taro.hideLoading()
      Taro.showToast({
        title: bindErr.data.message,
        icon: 'none',
        duration: 2000
      })
    })

  }

  loginErr = (error) => {
    this.getWechatCode()
    Taro.hideLoading()
    Taro.showToast({
      title: error.data.message,
      icon: 'none',
      duration: 2000
    })
  }

  //获取小程序code
  getWechatCode() {
    let _this = this
    Taro.login({
      success: function (result) {
        if (! result.code) {
          Taro.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
        _this.setState({
          wechatCode: result.code
        })
      }
    })
  }


  render() {
    return (
      <AtForm className='form'>
        <AtInput
          name='username'
          title='手机号码'
          type='phone'
          placeholder='请输入手机号码'
          value={this.state.username}
          onChange={this.handleChangeUsername.bind(this)}
          className='input'
        />
        <AtInput
          name='password'
          title='密码'
          type='password'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.handleChangePassword.bind(this)}
          className='input'
        />
        <AtButton type='primary' onClick={this.onSubmit.bind(this)}>提交</AtButton>
      </AtForm>
    )
  }
}
