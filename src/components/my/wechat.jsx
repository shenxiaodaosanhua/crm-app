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
    let _this = this
    Taro.requestSubscribeMessage({
      tmplIds: [
        'k8U4_CoBezPMPkA-rPZGP6Xu5LLjbpx4aZwkxdJsuOI',
        'Q-pqrx5YyIQEDTL3g52nCEG_daK3bIsQ_hUy4bkqgH4',
      ],
      success: function () {
        _this.bindToWechat()
      },
      fail: function () {
        Taro.showToast({
          title: '订阅失败',
          icon: 'none',
          duration: 2000,
        })
      }
    })


  }

  bindToWechat() {
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

  withdraw() {
    Taro.navigateTo({
      url: '/pages/withdraw/index'
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
          title='我的收益'
          arrow='right'
          onClick={this.balanceLog.bind(this)}
        />
        <AtListItem
          title='余额提现'
          arrow='right'
          onClick={this.withdraw.bind(this)}
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
