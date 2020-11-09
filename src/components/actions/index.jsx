import React from "react";
import {
  AtTabs,
  AtTabsPane,
  AtCard
} from "taro-ui";
import {View} from "@tarojs/components";

export default class Actions extends React.Component {

  state = {
    current: 0,
  }

  handleClick (value) {
    this.setState({
      current: value,
    })
  }

  render() {
    let actions = this.props.actions
    return (
      <AtTabs
        current={this.state.current}
        scroll
        height='130px'
        tabDirection='vertical'
        tabList={actions}
        onClick={this.handleClick.bind(this)}
        className='item-tab'
      >
        {
          actions && actions.map((item, key) => (
            <AtTabsPane
              tabDirection='vertical'
              current={this.state.current}
              index={key}
              className='item-tab-content'
            >
              <AtCard
                note={item.created_at}
                title='操作信息'
              >
                <View>{item.remark}</View>
              </AtCard>
            </AtTabsPane>
          ))
        }
      </AtTabs>
    )
  }
}
