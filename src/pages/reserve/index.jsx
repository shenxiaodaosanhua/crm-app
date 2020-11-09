import React from "react";
import Taro from '@tarojs/taro'
import {getCurrentInstance} from "@tarojs/runtime"
import {
  Picker, View
} from '@tarojs/components'
import {
  AtForm,
  AtButton,
  AtCalendar,
  AtList,
  AtListItem,
} from 'taro-ui'
import {
  reserve
} from '../../servers/servers'

import './index.less'

export default class Reserve extends React.Component {

  state = {
    timeSel: '00:00',
    day: '',
  }

  onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }

  onDate = date => {
    this.setState({
      day: date.value
    })
  }

  onSubmit() {
    let day = this.state.day,
      time = this.state.timeSel,
      now = Date.now(),
      params = getCurrentInstance().router.params

    if (!day) {
      day = (new Date(now)).toLocaleDateString()
    } else {
      day = day.end
    }

    Taro.showLoading({
      title: '加载中...'
    })
    reserve({
      'work_id': params.id,
      'date': day + ' ' + time
    }).then(() => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/info/index?id=' + params.id,
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

  render() {
    return (
      <View>
        <AtForm
          className='form'
        >
          <AtCalendar
            className='date'
            onSelectDate={this.onDate}
          />
          <Picker
            mode='time'
            className='time'
            onChange={this.onTimeChange}
          >
            <AtList>
              <AtListItem title='请选择时间' extraText={this.state.timeSel}  />
            </AtList>
          </Picker>
          <AtButton onClick={this.onSubmit.bind(this)} >提交</AtButton>
        </AtForm>
      </View>
    )
  }
}
