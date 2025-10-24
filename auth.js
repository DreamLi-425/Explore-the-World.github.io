// filepath: login-website/src/scripts/auth.js
// 认证相关功能

// 发送验证码
function sendVerificationCode(phone) {
    console.log('发送验证码到：', phone);
    
    // 模拟API调用
    setTimeout(() => {
        alert('验证码已发送到您的手机');
    }, 1000);
    
    // 启动倒计时
    startCountdown();
}

// 验证码倒计时
function startCountdown() {
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    let countdown = 60;
    
    sendCodeBtn.disabled = true;
    const originalText = sendCodeBtn.textContent;
    
    const timer = setInterval(() => {
        if (countdown > 0) {
            sendCodeBtn.textContent = `${countdown}秒后重试`;
            countdown--;
        } else {
            clearInterval(timer);
            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = originalText;
        }
    }, 1000);
}

// 用户登录
function loginUser(username, password) {
    console.log('登录用户：', username);
    // 模拟API调用
    setTimeout(() => {
        alert('登录成功！');
        // 在实际应用中，这里会跳转到主页或用户仪表板
        window.location.href = 'index.html';
    }, 1000);
}

// 用户注册
function registerUser(phone, code, password) {
    console.log('注册用户：', phone);
    // 模拟API调用
    setTimeout(() => {
        alert('注册成功！');
        // 在实际应用中，这里会跳转到登录页面或直接登录
        window.location.href = 'login.html';
    }, 1000);
}