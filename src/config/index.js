export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_RES_PATH : '/api',   // ypc

  baseUrl: {
    // dev: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_RES_PATH : '/api',
    
    dev: 'http://127.0.0.1:8113',
    pro: 'http://127.0.0.1:8113'

    // dev: 'http://457038in58hp.vicp.fun:80',
    // pro: 'http://457038in58hp.vicp.fun:80'

    // dev: 'http://127.0.0.1:8113',
    // pro: 'http://127.0.0.1:8113'

  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    
  }
}
