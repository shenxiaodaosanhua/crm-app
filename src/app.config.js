import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/index/index',
    'pages/auth/login',
    'pages/auth/wechat',
    'pages/info/index',
    'pages/reserve/index',
    'pages/fulfill/index',
    'pages/failure/index',
    'pages/assign/index',
    'pages/my/index',
    'pages/share/member',
    'pages/share/user',
    'pages/register/index',
    'pages/group/count',
    'pages/group/two',
    'pages/group/three',
    'pages/balance/index',
    'pages/product/info',
    'pages/share/product',
    'pages/my/my-work',
    'pages/withdraw/store',
    'pages/withdraw/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}
