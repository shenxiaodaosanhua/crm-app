/* eslint-disable import/prefer-default-export */
import httpRequest from "./http"

//获取工单列表
export const getWorksData = () => {
  return httpRequest.get('/work')
}

//code登录
export const getToken = (code) => {
  return httpRequest.get('/oauth/user/wechat/code', code)
}

//登录
export const login = (data) => {
  return httpRequest.post('/oauth/user/login', data)
}

//注册
export const register = (data) => {
  return httpRequest.post('/oauth/user/register', data)
}

//发送手机验证吗
export const sendMobileCode = (data) => {
  return httpRequest.post('/oauth/member/sms-code', data);
}

//绑定微信
export const bindUserWechat = (data) => {
  return httpRequest.post('/oauth/user/wechat/bind', data)
}

//获取详情
export const getWorkInfo = (id) => {
  return httpRequest.get('/work/' + id)
}

//接单
export const acceptWork = (data) => {
  return httpRequest.put('/work-action/accept', data)
}

//预约
export const reserve = (data) => {
  return httpRequest.put('/work-action/reserve', data)
}

//上传
export const uploadImage = (path) => {
  return httpRequest.upload('/upload', path)
}

//完成反馈
export const fulfill = (data) => {
  return httpRequest.put('/work-action/fulfill', data)
}

//用户列表
export const getUserNames = () => {
  return httpRequest.get('/user/names')
}

export const assign = (data) => {
  return httpRequest.put('/work-action/assign', data)
}

//获取分享客户二维码
export const getMemberQr = () => {
  return httpRequest.get('/my/member-qrcode')
}
//获取发展小伙伴二维码
export const getUserQr = () => {
  return httpRequest.get('/my/user-qrcode')
}

//获取我的信息
export const getMy = () => {
  return httpRequest.get('/my');
}

//获取我的分销成员数量
export const getMyGroupCount = () => {
  return httpRequest.get('/my/users-count')
}

//我的分销成员列表
export const getMyGroupUsers = (data) => {
  return httpRequest.get('/my/users', data)
}

//我的账单流水
export const getMyBalanceLog = () => {
  return httpRequest.get('/my/balance-log')
}
