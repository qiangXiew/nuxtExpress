/**
 * 正则校验 脚本
 */

export default {
    checkAge: (rule, value, callback) => {
        console.log(rule, "<:", value, ":>", callback, "rule, value, callback");
        if (!value) {
            let cueWords = {
                userName: "用户名",
                password: "密码"
            }[rule.field];
            return callback(new Error(`${cueWords}不能为空`));
        }
        if (rule.field === "userName") {
            if (
                !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) &&
                !/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
            ) {
                return callback(new Error(`请输入正确的用户名`));
            }
            this.userType = /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
                value
            )
                ? "mobile"
                : "email";
        }
        callback();
    },
    isCode: message => [
        { required: true, message: message, trigger: "blur" },
        { min: 4, message: "验证码格式错误", trigger: "blur" }
    ],
    isMobile: message => [
        {
            required: true,
            pattern: /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
            message: message,
            trigger: "blur"
        }
    ],
    getV: refs => {
        let rul
        refs.validate(valid => rul = valid)
        return rul
    }
}