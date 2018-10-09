// import { config } from "rx";

"use strict";
/**
 * 先配置环境变量
 */
const baseUrl = {
    development: {
        // PHP 调用地址
        phpUrl: "https://code.btcfoo.com",
        // NODE 调用地址
        nodeUrl: "https://node.btcfoo.com",
        // 测试 调用地址
        testUrl: "http://18.179.32.204:8080"
    },
    production: {
        phpUrl: "https://code.btcfoo.com/",
        nodeUrl: "https://node.btcfoo.com",
        testUrl: "http://18.179.32.204:8080"
    }
}
const config = {
    webApiloginIslogin: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/islogin`,
        method: 'POST',
        description: '获取用户登录状态'
    },
    indexIndexs: {
        path: `${baseUrl[process.env.NODE_ENV].phpUrl}/Index/indexs`,
        method: 'GET',
        description: '交易所头部实时资讯'
    },
    /**
     * 登录注册
     */
    webApiloginRegister: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/register`,
        method: 'POST',
        description: '用户注册'
    },
    webLoginImgcode: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/login/imgcode`,
        method: 'GET',
        description: '获取图片验证码'
    },
    webApiloginSendsmscode: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/sendsmscode`,
        method: 'POST',
        description: '获取短信验证码'
    },
    webApiloginSendmailcode: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/sendmailcode`,
        method: 'POST',
        description: '获取电子邮箱证码'
    },
    webApiloginLogin: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/login`,
        method: 'POST',
        description: '用户登录'
    },
    webApiloginFindpw: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/findpw`,
        method: 'POST',
        description: '找回密码'
    },
    webApiloginLoginout: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apilogin/loginout`,
        method: 'POST',
        description: '退出登录'
    },
    /**
     * 安全中心
     */

    webApisecurityGetuserinfo: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/getuserinfo`,
        method: 'POST',
        description: '获取认证与绑定信息'
    },
    webApisecurityLoginlog: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/loginlog`,
        method: 'POST',
        description: '登录日志'
    },
    webApisecurityCreatega: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/createga`,
        method: 'POST',
        description: '获取谷歌验证密钥'
    },
    webApisecurityBindga: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/bindga`,
        method: 'POST',
        description: '谷歌验证码-绑定'
    },
    webApisecurityEditga: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/editga`,
        method: 'POST',
        description: '谷歌验证码-修改'
    },
    webApisecurityClosega: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/closega`,
        method: 'POST',
        description: '谷歌验证码-关闭'
    },
    webApisecurityOpenga: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/openga`,
        method: 'POST',
        description: '谷歌验证码-打开'
    },
    webApisecuritySetassettoken: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/setassettoken`,
        method: 'POST',
        description: '资金密码-设置'
    },
    webApisecurityEditassettoken: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/editassettoken`,
        method: 'POST',
        description: '资金密码-修改'
    },
    webApisecurityEditpw: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/editpw`,
        method: 'POST',
        description: '登录密码-修改'
    },
    webApisecurityBindemail: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/bindemail`,
        method: 'POST',
        description: '邮箱-绑定'
    },
    webApisecurityAuthprimary: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/authprimary`,
        method: 'POST',
        description: '实名认证-第一步'
    },
    webApisecurityAuthadvance: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/authadvance`,
        method: 'POST',
        description: '实名认证-第二步 上传身份证'
    },
    webApisecurityBindmobile: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/bindmobile`,
        method: 'POST',
        description: '手机号-绑定'
    },
    webApisecurityResetmobile: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apisecurity/resetmobile`,
        method: 'POST',
        description: '手机号-重置'
    },
    /**
     * 财富中心
     */
    webApiaccountList: {
        path: `${baseUrl[process.env.NODE_ENV].testUrl}/web/apiaccount/list`,
        method: 'POST',
        description: '用户资产-获取'
    }



}

export default {
    ...config
}