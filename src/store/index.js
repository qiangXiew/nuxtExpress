
export const state = () => {
    // console.log(localStorage, '111223')
    return ({
        locales: ['en', 'zh'],// i18n语言
        locale: 'zh',// i18n语言
        authUser: '', // 登录成功记录用户名
        userInfo: 'null', // 用户认证状态
        pathCache: null // 路径缓存，登录成功自动跳转用
    })
}
export const getters = {
    locale: state => {
        let _locale = "";
        try {
            
            _locale = localStorage.locale
        } catch (e) {
            console.log(e);
        }
        return _locale || state.locale
    },
    gdus: state => {
        let us = "";
        try {
            if (!!localStorage.us) {
                console.log('有有有', localStorage.us)
                us = localStorage.us;
            }

        } catch (e) {
            console.log(e);
        }
        return state.authUser || us
    }
}
export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    SET_USER(state, user) {
        state.authUser = localStorage.us = user
    },
    SET_PATH(state, patch) {
        state.pathCache = patch
    },
    SET_USERINFO(state, getInfo) {
        state.userInfo = getInfo
    }
}