import Taro from "@tarojs/taro";
import {
  getToken
} from './servers'
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage.route
}

export const pageToLogin = () => {
  Taro.login({
    success: loginCode
  })
}

function loginCode(result) {
  let path = getCurrentPageUrl()
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
    Taro.redirectTo({
      url: '/' + path
    })
  }).catch(function () {
    if (!path.includes('/pages/auth/wechat')) {
      Taro.redirectTo({
        url: "/pages/auth/login"
      })
    }
  })
}
