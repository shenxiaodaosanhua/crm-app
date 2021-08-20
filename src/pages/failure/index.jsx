import React from "react";
import Taro from '@tarojs/taro'
import {
  AtForm,
  AtButton,
  AtTextarea,
  AtImagePicker,
  AtRadio,
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
    failOpt: [
      { label: '用户原因', value: 1, desc: '用户取消安装、用户改套餐、宽带未到期等' },
      { label: '装机地址描述不清楚实际无法安装', value: 2,},
      { label: '系统核查没资源仍然下单', value: 3,},
      { label: '物业协调及施工受阻', value: 4,},
      { label: '三化商不装', value: 5,},
      { label: '无路由', value: 6, desc: '跨马路，所在楼栋、楼层没覆盖'},
      { label: '资源满', value: 7, },
      { label: '资源判断查询地址定位不准', value: 8, desc: '超150米等'},
      { label: '重复工单', value: 9,},
      { label: '业务受理错误', value: 10,},
      { label: '无资源', value: 11, desc: '资源不准'},
    ],
    failType: 0,
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
      'fail_type': this.state.failType,
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

  handleOptChange (value) {
    this.setState({
      failType: value
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
        <AtRadio
          options={this.state.failOpt}
          value={this.state.failType}
          onClick={this.handleOptChange.bind(this)}
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
