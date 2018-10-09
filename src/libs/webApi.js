import Axios from '~/plugins/axios'
import Config from '~/libs/webApiConfig'
import qs from 'qs'
const merge = require('lodash/merge')

class webApi {
    constructor() {
        this._enroll = {}
        this._getApi()
    }

    /**
     * axios异步模块
     */
    async _axios(config, patch = "", header, urlData) {
        let { path, method } = config,
            headers = header || "",
            _this
        path = urlData ? `${path}/${urlData}` : path
        if (path.urlData) delete patch('urlData')
        if (patch && patch.isThis) _this = patch.isThis; delete patch["isThis"]
        // if (headers['Content-Type'] === "multipart/form-data") {
        //     patch = { data: patch }
        // } else {
        //     patch = config.method === "POST" ? { data: qs.stringify(patch) } : { params: patch }
        // }
        patch = (headers['Content-Type'] === "multipart/form-data" && { data: patch }) || (config.method === "POST" && { data: qs.stringify(patch) }) || { params: patch }
        patch = merge(patch, { url: path, method, headers }, { timeout: 15000 })
        //以上入参
        try {
            let res = await Axios.request(patch).then(res => res).catch(err => {
                console.error(err)
                return
            })

            //以下出参
            if (res.msg === "您还没有登录") {
                _this.$store.commit("SET_PATH", _this.$route.path)
                _this.$router.push('/login')
                console.log(res, _this)
            }
            return res
        } catch (e) {
            console.log(e)
        }
    }

    _getApi(url) {
        this._enroll.webApiloginIslogin = async patch => this._axios(Config.webApiloginIslogin, patch)
        this._enroll.indexIndexs = async patch => this._axios(Config.indexIndexs, patch)
        this._enroll.webApiloginRegister = async patch => this._axios(Config.webApiloginRegister, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webLoginImgcode = async patch => this._axios(Config.webLoginImgcode, patch)
        this._enroll.webApiloginSendsmscode = async patch => this._axios(Config.webApiloginSendsmscode, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApiloginSendmailcode = async patch => this._axios(Config.webApiloginSendmailcode, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })

        this._enroll.webApiloginLogin = async patch => this._axios(Config.webApiloginLogin, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApiloginFindpw = async patch => this._axios(Config.webApiloginFindpw, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        /**
         * 安全中心
         */
        this._enroll.webApisecurityGetuserinfo = async patch => this._axios(Config.webApisecurityGetuserinfo, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityLoginlog = async patch => this._axios(Config.webApisecurityLoginlog, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityCreatega = async patch => this._axios(Config.webApisecurityCreatega, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityBindga = async patch => this._axios(Config.webApisecurityBindga, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityEditga = async patch => this._axios(Config.webApisecurityEditga, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityClosega = async patch => this._axios(Config.webApisecurityClosega, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityOpenga = async patch => this._axios(Config.webApisecurityOpenga, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecuritySetassettoken = async patch => this._axios(Config.webApisecuritySetassettoken, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityEditassettoken = async patch => this._axios(Config.webApisecurityEditassettoken, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityEditpw = async patch => this._axios(Config.webApisecurityEditpw, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityBindemail = async patch => this._axios(Config.webApisecurityBindemail, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApiloginLoginout = async patch => this._axios(Config.webApiloginLoginout, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityAuthprimary = async patch => this._axios(Config.webApisecurityAuthprimary, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityAuthadvance = async patch => this._axios(Config.webApisecurityAuthadvance, patch, { 'Content-Type': 'multipart/form-data' })
        this._enroll.webApisecurityResetmobile = async patch => this._axios(Config.webApisecurityResetmobile, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        this._enroll.webApisecurityBindmobile = async patch => this._axios(Config.webApisecurityBindmobile, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })
        /**
         * 财富中心
         */
        this._enroll.webApiaccountList = async patch => this._axios(Config.webApiaccountList, patch, { 'Content-Type': 'application/x-www-form-urlencoded' })



    }

}
export default new webApi()