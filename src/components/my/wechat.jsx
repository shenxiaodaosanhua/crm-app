import React from "react"
import Taro from '@tarojs/taro'
import {
  AtList,
  AtListItem,
  AtDivider,
} from "taro-ui"
import {
  bindUserWechat,
} from "../../servers/servers"

export default class User extends React.Component {

  bindWechat() {
    Taro.login({
      success: function(result) {
        bindUserWechat({
          code: result.code
        }).then(() => {
          Taro.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: 3000,
          })
        }).catch(error => {
          Taro.showToast({
            title: error.data.message,
            icon: 'none',
            duration: 3000,
          })
        })
      }
    })
  }

  loginOut() {
    Taro.setStorageSync('Authorization', '')
    Taro.redirectTo({
      url: '/pages/auth/login'
    })
  }

  balanceLog() {
    Taro.navigateTo({
      url:'/pages/balance/index',
    })
  }

  render() {
    let my = this.props.my
    return (
      <AtList
        hasBorder={false}
      >
        <AtDivider content='用户' />
        <AtListItem
          title='账单流水'
          arrow='right'
          onClick={this.balanceLog.bind(this)}
        />
        <AtListItem
          title='余额提现'
          arrow='right'
        />
        {
          my && (my.is_bind == 1) ? (
            <AtListItem
              title='登陆绑定'
              extraText='已绑定'
              disabled
            />
          ) : (
            <AtListItem
              title='登陆绑定'
              arrow='right'
              onClick={this.bindWechat.bind(this)}
            />
          )
        }
        <AtListItem
          title='退出'
          arrow='right'
          onClick={this.loginOut.bind(this)}
        />
      </AtList>
    )
  }
}
