import { genRequestFunc } from '../genRequestFunc'

export default {
  smsLogin: genRequestFunc('crm/user/smsLogin', 'post'),
  getQrAuthUrl: genRequestFunc('crm/wechat/getQrAuthUrl'),
}
