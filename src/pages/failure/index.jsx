import React from "react";
import Taro from '@tarojs/taro'
import {
  AtForm,
  AtButton,
  AtTextarea,
  AtImagePicker
} from 'taro-ui'
import {
  uploadImage,
  failure,
} from '../../servers/servers'
import './index.less'
import {getCurrentInstance} from "@tarojs/runtime";

export default class Failure extends React.Component {

  state = {
    remark: '',
    files: [],
    showAddBtn: true,
    fileName: [],
  }

  onSubmit() {
    let params = getCurrentInstance().router.params

    Taro.showLoading({
      title: '提交中...'
    })
    failure({
      'work_id': params.id,
      remark: this.state.remark,
      fileName: this.state.fileName,
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

  handleChange (value) {
    this.setState({
      remark: value
    })
  }

  uploadChange(files) {
    this.setState({
      files,
    })
    this.handleFile()

    Taro.showLoading({
      title: '上传中...'
    })
    let file = files[files.length-1]
    this.upload(file.file.path)
  }

  handleFile() {

    let fileCount = this.state.files.length
    if (fileCount === 3) {
      this.setState({
        showAddBtn: false,
      })
    } else {
      this.setState({
        showAddBtn: true,
      })
    }
    let showAddBtn = this.state.showAddBtn,
      images = this.state.files
    if ((images.length < 3) && (! showAddBtn)) {
      this.setState({
        showAddBtn: true
      })
    }
  }

  onFail(error) {
    console.log(error.errMsg)
  }

  upload(path) {
    uploadImage(path).then(result => {
      this.setState(prevState => ({
        fileName: [...prevState.fileName, result.data],
      }))

      Taro.hideLoading()
      Taro.showToast({
        title: '上传成功',
        icon: 'none',
        duration: 3000,
      })

    }).catch(() => {
      Taro.hideLoading()
      Taro.showToast({
        title: '上传失败',
        icon: 'none',
        duration: 3000,
      })
    })
  }

  render() {
    return (
      <AtForm
        className='form'
      >
        <AtTextarea
          value={this.state.remark}
          onChange={this.handleChange.bind(this)}
          maxLength={200}
          placeholder='完成反馈'
          className='input'
        />
        <AtImagePicker
          count={1}
          length={3}
          files={this.state.files}
          onChange={this.uploadChange.bind(this)}
          className='input'
          showAddBtn={this.state.showAddBtn}
          onFail={this.onFail.bind(this)}
        />
        <AtButton onClick={this.onSubmit.bind(this)} >提交</AtButton>
      </AtForm>
    )
  }
}
