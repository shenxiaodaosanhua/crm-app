import React from "react"
import {
  View,
} from "@tarojs/components"
import {
  AtCard,
} from 'taro-ui'
import './index.less'

export default class BalanceLog extends React.Component {

  render() {
    let log = this.props.log
    return (
      <AtCard
        extra={'金额:' + log.make_price}
        title={log.type}
        className='log-item'
        note={'时间:' + log.created_at}
      >
        <View>备注:{log.remark}</View>
      </AtCard>
    )
  }
}
