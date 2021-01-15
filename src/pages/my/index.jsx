import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
  Image,
  Button,
} from "@tarojs/components"
import {
  AtList,
  AtListItem,
  AtDivider,
  AtModal,
  AtModalContent,
  AtModalAction,
} from "taro-ui"
import {
  bindUserWechat,
  getMemberQr, getUserQr,
} from "../../servers/servers"
import Footer from "../../components/footer"
import './index.less'

export default class My extends React.Component {

  state = {
    isOpened: false,
    imageUrl: "",
    my: {},
  }

  componentWillMount() {
    let user = Taro.getStorageSync('my')
    this.setState({
      my: user,
    })
  }

  loginOut() {
    Taro.setStorageSync('Authorization', '')
    Taro.redirectTo({
      url: '/pages/auth/login'
    })
  }

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

  memberOpened() {
    getMemberQr().then(result => {
      this.setState({
        isOpened: true,
        imageUrl: result.data.url,
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  userOpened() {
    getUserQr().then(result => {
      this.setState({
        isOpened: true,
        imageUrl: result.data.url,
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  closeShare() {
    this.setState({
      isOpened: false,
      imageUrl: '',
    })
  }

  myUserGroup() {
    Taro.navigateTo({
      url: '/pages/group/count',
    })
  }

  render() {
    return (
      <View className='warp'>
        <View className='at-row at-row__justify--center'>
          <View
            className='at-col-2'
          >
            {this.state.my.name}
          </View>
        </View>
        <AtList
          hasBorder={false}
        >
          <AtDivider content='业务' />
          <AtListItem
            title='我的业绩'
            arrow='right'
          />
          <AtListItem
            title='分享赚钱'
            arrow='right'
            onClick={this.memberOpened.bind(this)}
          />
          <AtListItem
            title='促成交易'
            arrow='right'
          />
          <AtDivider content='员工' />
          <AtListItem
            title='我的小伙伴'
            arrow='right'
            onClick={this.myUserGroup.bind(this)}
          />
          {
            this.state.my && (this.state.my.level < 3) ? (
              <AtListItem
                title='发展小伙伴'
                arrow='right'
                onClick={this.userOpened.bind(this)}
              />
            ) : ""
          }

          <AtDivider content='用户' />
          {
            this.state.my && this.state.my.is_bind ? (
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
        <Footer />
        <AtModal
          isOpened={this.state.isOpened}
        >
          <AtModalContent>
            <View className='at-row at-row__justify--center'>
              <Image
                style='width: 180px;height: 180px;'
                src={this.state.imageUrl}
              />
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button
              onClick={this.closeShare.bind(this)}
            >关闭</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
