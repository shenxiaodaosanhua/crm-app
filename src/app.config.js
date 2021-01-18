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
    'pages/register/index',
    'pages/group/count',
    'pages/group/two',
    'pages/balance/index',
    'pages/product/info',
    'pages/share/product',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}
