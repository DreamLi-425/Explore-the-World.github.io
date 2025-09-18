// 表单验证功能

// 验证手机号
function validatePhone(phone) {
    if (!phone) {
        alert('请输入手机号码');
        return false;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入正确的手机号码');
        return false;
    }
    
    return true;
}

// 验证登录表单
function validateLoginForm(username, password) {
    if (!username) {
        alert('请输入用户名');
        return false;
    }
    
    if (!password) {
        alert('请输入密码');
        return false;
    }
    
    return true;
}

// 验证注册表单
function validateRegisterForm(phone, code, password, confirmPassword, agreed) {
    if (!validatePhone(phone)) {
        return false;
    }
    
    if (!code) {
        alert('请输入验证码');
        return false;
    }
    
    if (!password) {
        alert('请输入密码');
        return false;
    }
    
    if (password.length < 6 || password.length > 20) {
        alert('密码长度应在6-20位之间');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return false;
    }
    
    if (!agreed) {
        alert('请同意服务协议和隐私政策');
        return false;
    }
    
    return true;
}