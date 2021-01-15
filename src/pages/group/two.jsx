import React from "react"
import {
  View,
} from "@tarojs/components"
import {
  getMyGroupUsers,
} from "../../servers/servers"
import Footer from "../../components/footer"
import Group from '../../components/group'

export default class Two extends React.Component {

  state = {
    users: [],
  }

  componentWillMount() {
    getMyGroupUsers({
      name: 'two',
    }).then(result => {
      this.setState({
        users: result.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {

    return (
      <View className='warp'>
        {
          this.state.users.map(user => <Group user={user} />)
        }
        <Footer />
      </View>
    )
  }
}
