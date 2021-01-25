import React from "react"
import Taro from '@tarojs/taro'
import {
  View,
} from "@tarojs/components"
import {
  AtListItem,
} from "taro-ui"
import {
  getMyGroupCount,
} from "../../servers/servers"
import Footer from "../../components/footer"

export default class Count extends React.Component {

  state = {
    two: 0,
    three: 0,
  }

  componentWillMount() {
    getMyGroupCount().then(result => {
      this.setState({
        two: result.data.two,
        three: result.data.three,
      })
    }).catch(error => {
      console.log(error)
    })
  }

  toTwo() {
    Taro.navigateTo({
      url: '/pages/group/two',
    })
  }

  toThree() {
    Taro.navigateTo({
      url: '/pages/group/three',
    })
  }

  render() {
    return (
      <View className='warp'>
        {
          this.state.two > 0 ? (
            <AtListItem
              title='二级小伙伴'
              extraText={this.state.two}
              arrow='right'
              onClick={this.toTwo.bind(this)}
            />
          ) : (
            <AtListItem
              title='二级小伙伴'
              extraText={this.state.two}
              disabled
            />
          )
        }

        {
          this.state.three > 0 ? (
            <AtListItem
              title='三级小伙伴'
              extraText={this.state.three}
              arrow='right'
              onClick={this.toThree.bind(this)}
            />
          ) : (
            <AtListItem
              title='三级小伙伴'
              extraText={this.state.three}
              disabled
            />
          )
        }
        <Footer />
      </View>
    )
  }
}
