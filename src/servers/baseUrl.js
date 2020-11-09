const getBaseUrl = () => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    // BASE_URL = 'http://crm.ipicture.vip/api'
    BASE_URL = 'http://crm.test/api'
  } else {
    BASE_URL = 'http://crm.ipicture.vip/api'
  }
  return BASE_URL
}

export default getBaseUrl;
