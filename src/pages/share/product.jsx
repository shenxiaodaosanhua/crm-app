import React from "react"
import {
  View,
} from "@tarojs/components"
import {
  getProduct,
} from "../../servers/servers"
import ProductList from '../../components/product-list'
import Footer from "../../components/footer"

export default class Product extends React.Component {

  state = {
    list: [],
  }

  componentWillMount() {
    this.product()
  }

  product() {
    getProduct().then(result => {
      this.setState({
        list: result.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    let list = this.state.list

    return (
      <View>
        <View className='at-row at-row--wrap'>
          {
            list.map(product => <ProductList product={product} />)
          }
        </View>
        <Footer />
      </View>
    )
  }
}
