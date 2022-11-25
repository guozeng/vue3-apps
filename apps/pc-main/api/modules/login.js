import createApi from '../createApi'

export default {
  smsLogin: createApi('crm/user/smsLogin', 'post'),
  getQrAuthUrl: createApi('crm/wechat/getQrAuthUrl'),
}
