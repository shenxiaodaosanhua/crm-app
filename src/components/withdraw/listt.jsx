import React from "react"
import {
  View,
} from "@tarojs/components"
import {
  AtCard,
} from 'taro-ui'
import './index.less'

export default class List extends React.Component {

  render() {
    let log = this.props.log
    return (
      <AtCard
        extra={'金额:' + log.amount}
        title={log.state}
        className='log-item'
        note={'提交时间:' + log.created_at}
      >
        <View>
          <View>
            银行名称:{log.bank_name}
          </View>
          <View>
            开户支行:{log.bank_address}
          </View>
          <View>
            卡号:{log.bank_number}
          </View>
          <View>
            开户名字:{log.name}
          </View>
          <View>
            更新时间:{log.updated_at}
          </View>
        </View>
      </AtCard>
    )
  }
}
