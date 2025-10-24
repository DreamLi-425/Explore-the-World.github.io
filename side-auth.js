// 负责：异步加载 components/side-auth.html，并绑定登录/注册切换与表单事件
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('side-auth-container');
    if (!container) {
        console.error('side-auth: 找不到 #side-auth-container 元素');
        return;
    }

    // 相对 index.html 的路径
    const url = 'components/side-auth.html';

    fetch(url, { cache: 'no-store' })
        .then(resp => {
            if (!resp.ok) throw new Error('网络响应非 OK: ' + resp.status);
            return resp.text();
        })
        .then(text => {
            // 尝试解析为 document，优先寻找 template#side-auth-template
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');

                // 1) template#side-auth-template
                const tpl = doc.querySelector('template#side-auth-template');
                if (tpl) {
                    container.appendChild(tpl.content.cloneNode(true));
                    initSideAuth();
                    return;
                }

                // 2) 如果返回的是完整 HTML （含 .side-login 节点），尝试提取 .side-login
                const side = doc.querySelector('.side-login');
                if (side) {
                    container.appendChild(side.cloneNode(true));
                    initSideAuth();
                    return;
                }

                // 3) 若返回纯片段（没有 <html>），直接把文本作为节点插入并尝试初始化
                const wrapper = document.createElement('div');
                wrapper.innerHTML = text.trim();
                const fragSide = wrapper.querySelector('.side-login');
                if (fragSide) {
                    container.appendChild(fragSide.cloneNode(true));
                    initSideAuth();
                    return;
                }

                // 最后兜底：直接插入文本（便于调试）
                container.innerHTML = text;
                initSideAuth();
            } catch (err) {
                console.error('side-auth: 解析组件失败', err);
                container.innerHTML = '<div style="padding:12px;color:#900;">侧边认证组件解析失败，请检查 components/side-auth.html</div>';
            }
        })
        .catch(err => {
            console.error('side-auth: 加载失败', err);
            container.innerHTML = '<div style="padding:12px;color:#900;">无法加载侧边认证组件（components/side-auth.html）。确保文件存在并通过 HTTP 服务器访问。</div>';
        });

    // 绑定切换与表单提交（存在性检查以避免报错）
    function initSideAuth() {
        const panelLogin = document.getElementById('panel-login');
        const panelRegister = document.getElementById('panel-register');
        const toRegister = document.getElementById('toRegister');
        const toLogin = document.getElementById('toLogin');
        const sideLoginForm = document.getElementById('sideLoginForm');
        const sideRegisterForm = document.getElementById('sideRegisterForm');
        const sendCodeBtnSide = document.getElementById('sendCodeBtnSide');

        function showRegister() {
            if (panelLogin) panelLogin.classList.replace('panel-visible', 'panel-hidden');
            if (panelRegister) panelRegister.classList.replace('panel-hidden', 'panel-visible');
        }
        function showLogin() {
            if (panelRegister) panelRegister.classList.replace('panel-visible', 'panel-hidden');
            if (panelLogin) panelLogin.classList.replace('panel-hidden', 'panel-visible');
        }

        if (toRegister) toRegister.addEventListener('click', e => { e.preventDefault(); showRegister(); });
        if (toLogin) toLogin.addEventListener('click', e => { e.preventDefault(); showLogin(); });

        if (sideLoginForm) {
            sideLoginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const username = (document.getElementById('side-username') || {}).value || '';
                const password = (document.getElementById('side-password') || {}).value || '';
                if (typeof validateLoginForm === 'function') {
                    if (validateLoginForm(username, password) && typeof loginUser === 'function') loginUser(username, password);
                } else {
                    if (typeof loginUser === 'function') loginUser(username, password);
                }
            });
        }

        if (sendCodeBtnSide) {
            sendCodeBtnSide.addEventListener('click', function () {
                const phoneEl = document.getElementById('side-phone');
                const phone = phoneEl ? phoneEl.value : '';
                if (typeof validatePhone === 'function') {
                    if (!validatePhone(phone)) return;
                }
                if (typeof sendVerificationCode === 'function') sendVerificationCode(phone);
            });
        }

        if (sideRegisterForm) {
            sideRegisterForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const phone = (document.getElementById('side-phone') || {}).value || '';
                const code = (document.getElementById('side-verifyCode') || {}).value || '';
                const password = (document.getElementById('side-password-register') || {}).value || '';
                const confirmPassword = (document.getElementById('side-confirm-password') || {}).value || '';
                const agreed = !!(document.getElementById('side-agreement') && document.getElementById('side-agreement').checked);

                if (typeof validateRegisterForm === 'function') {
                    if (validateRegisterForm(phone, code, password, confirmPassword, agreed) && typeof registerUser === 'function') {
                        registerUser(phone, code, password);
                    }
                } else {
                    if (typeof registerUser === 'function') registerUser(phone, code, password);
                }
            });
        }
    }
});