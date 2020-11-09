import React from "react"
import Taro from '@tarojs/taro'
import {
  AtButton,
  AtForm,
  AtList,
  AtListItem,
} from "taro-ui"
import {Picker} from "@tarojs/components"
import {
  getUserNames,
  assign,
} from '../../servers/servers'
import './index.less'
import {getCurrentInstance} from "@tarojs/runtime";

export default class Assign extends React.Component {
  state = {
    selector: [],
    selectorChecked: '',
  }

  componentWillMount() {
    Taro.showLoading({
      title: '加载中...'
    })
    getUserNames().then(result => {
      this.setState({
        selector: result.data,
        selectorChecked: result.data[0],
      })
      Taro.hideLoading()
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  onSubmit() {
    let params = getCurrentInstance().router.params
    Taro.showLoading({
      title: '提交中...'
    })
    assign({
      'work_id': params.id,
      name: this.state.selectorChecked,
    }).then(() => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/info/index?id=' + params.id
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
      <AtForm className='form'>
        <Picker
          mode='selector'
          range={this.state.selector}
          onChange={this.onChange}
          className='input'
        >
          <AtList>
            <AtListItem
              title='国家地区'
              extraText={this.state.selectorChecked}
            />
          </AtList>
        </Picker>
        <AtButton onClick={this.onSubmit.bind(this)}>提交</AtButton>
      </AtForm>
    )
  }
}
