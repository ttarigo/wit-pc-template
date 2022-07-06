import {RequestConfig} from './request'
import {RequestInterceptor, ResponseInterceptor} from 'umi-request'
import debounce from 'lodash/debounce'
import {getToken, removeToken} from '@/utils/auth.js'
import {MessageBox} from "element-ui";
import store from '@/store'
import { resetRouter } from '@/router'
const reLoginCode = [401]

const tokenRequestInterceptor: RequestInterceptor = (url, options) => {
  const noToken = options.noToken
  const innerOptions = {
    ...options
  }
  if (!noToken && getToken()) {
    innerOptions.headers = {
      ...options.headers,
      'Authorization': 'Bearer ' + getToken()
    }
  }
  return {
    url,
    options: innerOptions
  }
}

const responseInterceptor: ResponseInterceptor = async (response:Response) => {
  let data = null
  try {
    data = await response.clone().json()
  } catch (_) {

  }
  if (reLoginCode.indexOf(response.status) > -1 || (data && reLoginCode.indexOf(data?.code) > -1)) {
    debounce(()=>{
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
      }).then(_=>{
        removeToken()
        resetRouter()
        store.commit('user/RESET_STATE')
        location.href = '/login'
      })
    }, 800)()

    return {
      ...response,
      success: false,
      showType:0,
      errorCode: 401,
      errorMsg: '',
      data: {}
    }
  }
  return response
}

const requestConfig: RequestConfig = {
  prefix: process.env["VUE_APP_BASE_API"],
  errorConfig: {
    adaptor: (resData, context) => {
      if (context.req.options.requestType === 'form') {
        return {
          success: !!resData,
          data: resData,
          errorCode: '200',
          errorMessage: ''
        }
      }
      if (context.req.options.responseType === 'blob') {
        return {
          success: true,
          data: resData,
          errorCode: '200',
          errorMessage: ''
        }
      }

      const success = resData.code === '00000' || resData.code == 200 || resData.code == 0
      const showType = resData.showType ?? (success ? 0 : 2)
      return {
        success,
        data: resData.data,
        showType,
        errorCode: resData.code + '',
        errorMessage: resData.userTips || resData.msg
      }

    }
  },
  requestInterceptors: [tokenRequestInterceptor],
  responseInterceptors: [responseInterceptor],
}

export default requestConfig
