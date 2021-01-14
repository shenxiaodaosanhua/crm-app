import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/index/index',
    'pages/auth/login',
    'pages/auth/wechat',
    'pages/info/index',
    'pages/reserve/index',
    'pages/fulfill/index',
    'pages/assign/index',
    'pages/my/index',
    'pages/share/member',
    'pages/share/user',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}
