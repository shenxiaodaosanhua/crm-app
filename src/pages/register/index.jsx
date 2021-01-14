import React from "react";
import Taro from "@tarojs/taro"
import {Button, Form, Input, View} from "@tarojs/components";
import './index.less'
import {register, sendMobileCode} from "../../servers/servers";
import {getCurrentInstance} from "@tarojs/runtime";

export default class Register extends React.Component {

  state = {
    codeButton: false,
    codeButtonText: '获取验证码',
    wait: 59,
    mobile: '',
    userId: 0,
  }

  componentDidMount () {
    let params = getCurrentInstance().router.params
    if ((params.user_id) && (params.user_id > 0)) {
      Taro.setStorageSync('user_id', params.user_id);
      this.setState({
        userId: params.user_id,
      })
    }
  }

  /**
   * 提交表单
   * @param result
   * @returns {boolean}
   */
  onSubmit = result => {

    if (! result.detail.value.mobile) {
      Taro.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    if (! result.detail.value.password) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    if (! result.detail.value.code) {
      Taro.showToast({
        title: '请输入手机验证码',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    Taro.showLoading({
      title: '登录中...'
    })
    let data = {
      mobile: result.detail.value.mobile,
      password: result.detail.value.password,
      code: result.detail.value.code,
      "user_id": this.state.userId,
    }

    register(data).then(res => {
      Taro.setStorageSync('Authorization', res.data.token)
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 2000,
      })
    })
  }

  /**
   * 发送验证码
   * @returns {boolean}
   */
  sendCode = () => {
    if (! this.state.mobile) {
      Taro.showToast({
        title: '请输入手机验证码',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    Taro.showLoading({
      title: '发送中...'
    })
    let data = {
      mobile: this.state.mobile
    }
    sendMobileCode(data).then(() => {
      this.setState({
        codeButton: true,
      })
      this.sendCodeButton()
      Taro.hideLoading()
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 2000,
      })
    })
  }

  /**
   * 处理验证码按钮
   */
  sendCodeButton() {
    let {wait} = this.state
    let siv = setInterval(() => {
      this.setState({wait: (wait--)}, () => {
        if (wait <= -1) {
          clearInterval(siv);
          this.setState({
            codeButton: false,
            wait: 59,
            codeButtonText: '获取验证码',
          })
          return true
        }

        this.setState({
          codeButtonText: wait + '秒',
        })
      })
    }, 1000);
  }

  /**
   * 获取手机号码
   * @param result
   */
  setMobile = result => {
    this.setState({
      mobile: result.detail.value,
    })
  }

  render() {
    return (
      <View className='warp'>
        <Form
          onSubmit={this.onSubmit}
        >
          <View className='input-block'>
            <Input
              type='number'
              name='mobile'
              placeholder='请输入手机号码'
              className='input'
              maxLength={11}
              onBlur={this.setMobile}
            />
          </View>
          <View className='input-block'>
            <Input
              type='password'
              name='password'
              placeholder='请输入密码'
              className='input'
            />
          </View>
          <View className='at-row input-block'>
            <Input
              type='number'
              name='code'
              placeholder='请输入验证码'
              className='at-col-6 input'
            />
            <Button
              className='at-col-4 button-code'
              disabled={this.state.codeButton}
              onClick={this.sendCode}
            >{this.state.codeButtonText}</Button>
          </View>
          <Button
            type='primary'
            size='default'
            formType='submit'
            className='button-submit'
          >登录</Button>
        </Form>
      </View>
    )
  }
}
