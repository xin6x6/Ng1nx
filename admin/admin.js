(() => {
    const loginDiv = document.getElementById('login');
    const adminPanel = document.getElementById('adminPanel');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const messagesDiv = document.getElementById('messages');
    // Panels and tabs
    const tabMessages = document.getElementById('tabMessages');
    const tabVisits = document.getElementById('tabVisits');
    const messagesPanel = document.getElementById('messagesPanel');
    const visitsPanel = document.getElementById('visitsPanel');
    const visitsBody = document.getElementById('visitsBody');

    let adminPassword = null;

    // escape HTML 防XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;',
            "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    // 登录成功后保存密码并加载留言
    function onLoginSuccess(password) {
        adminPassword = password;
        loginDiv.style.display = 'none';
        adminPanel.style.display = 'block';
        loginError.textContent = '';
        passwordInput.value = '';
        // 默认显示留言面板，隐藏访问记录面板
        if (messagesPanel) messagesPanel.style.display = '';
        if (visitsPanel) visitsPanel.style.display = 'none';
        // 初始化tab切换
        if (tabMessages && tabVisits && messagesPanel && visitsPanel) {
            tabMessages.onclick = () => {
                messagesPanel.style.display = '';
                visitsPanel.style.display = 'none';
            };
            tabVisits.onclick = () => {
                messagesPanel.style.display = 'none';
                visitsPanel.style.display = '';
                loadVisits();
            };
        }
        loadMessages();
    }

    // 退出登录
    logoutBtn.onclick = () => {
        adminPassword = null;
        adminPanel.style.display = 'none';
        loginDiv.style.display = 'block';
    };

    // 登录按钮点击
    loginBtn.onclick = () => {
        const pwd = passwordInput.value.trim();
        if (!pwd) {
            loginError.textContent = '请输入密码';
            return;
        }
        // 测试密码是否正确，调用管理接口
        fetch('/admin/messages', {
            headers: { 'X-Admin-Password': pwd }
        }).then(res => {
            if (res.status === 200) {
                onLoginSuccess(pwd);
            } else {
                loginError.textContent = '密码错误';
            }
        }).catch(() => {
            loginError.textContent = '连接失败，请稍后再试';
        });
    };

    // 加载留言
    async function loadMessages() {
        messagesDiv.innerHTML = '加载中...';
        try {
            const res = await fetch('/admin/messages', {
                headers: { 'X-Admin-Password': adminPassword }
            });
            if (res.status !== 200) throw new Error('权限不足');
            const msgs = await res.json();
            if (!msgs.length) {
                messagesDiv.innerHTML = '<p>暂无留言</p>';
                return;
            }
            messagesDiv.innerHTML = '';
            msgs.forEach(m => {
                const div = document.createElement('div');
                div.className = 'message-item';
                div.dataset.id = m.id;
                div.innerHTML = `
          <strong>${escapeHTML(m.name)}</strong>
          <textarea>${escapeHTML(m.message)}</textarea>
          <small>${new Date(m.created_at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</small>
          <div class="btn-group">
            <button class="btn btn-save">保存</button>
            <button class="btn btn-delete">删除</button>
          </div>
        `;
                // 保存按钮
                div.querySelector('.btn-save').onclick = () => saveMessage(m.id, div.querySelector('textarea').value);
                // 删除按钮
                div.querySelector('.btn-delete').onclick = () => deleteMessage(m.id);
                messagesDiv.appendChild(div);
            });
        } catch (err) {
            messagesDiv.innerHTML = '<p class="error">加载失败或权限不足</p>';
        }
    }

    // 加载访问记录
    async function loadVisits() {
        if (!visitsBody) return;
        visitsBody.innerHTML = '<tr><td colspan="3">加载中...</td></tr>';
        try {
            const res = await fetch('/admin/visits', {
                headers: { 'X-Admin-Password': adminPassword }
            });
            if (res.status !== 200) throw new Error('权限不足');
            const visits = await res.json();
            if (!visits.length) {
                visitsBody.innerHTML = '<tr><td colspan="3">暂无访问记录</td></tr>';
                return;
            }
            visitsBody.innerHTML = '';
            visits.forEach(v => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${escapeHTML(String(v.id))}</td>
                  <td>${escapeHTML(v.ip)}</td>
                  <td>${new Date(v.visit_time).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</td>
                `;
                visitsBody.appendChild(tr);
            });
        } catch (err) {
            visitsBody.innerHTML = '<tr><td colspan="3" class="error">加载失败或权限不足</td></tr>';
        }
    }

    // 保存修改
    async function saveMessage(id, message) {
        try {
            const res = await fetch(`/admin/messages/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Password': adminPassword
                },
                body: JSON.stringify({ message })
            });
            if (res.status === 200) {
                alert('保存成功');
                loadMessages();
            } else {
                alert('保存失败，权限不足或服务器错误');
            }
        } catch {
            alert('保存请求失败');
        }
    }

    // 删除留言
    async function deleteMessage(id) {
        if (!confirm('确认删除该留言吗？')) return;
        try {
            const res = await fetch(`/admin/messages/${id}`, {
                method: 'DELETE',
                headers: { 'X-Admin-Password': adminPassword }
            });
            if (res.status === 200) {
                alert('删除成功');
                loadMessages();
            } else {
                alert('删除失败，权限不足或服务器错误');
            }
        } catch {
            alert('删除请求失败');
        }
    }
})();