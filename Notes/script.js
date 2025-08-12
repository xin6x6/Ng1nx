let lastMessagesHTML = '';
let lastMessageTime = "1970-01-01T00:00:00Z"; // 记录最新消息时间
const messagesContainer = document.getElementById('messages');
const form = document.getElementById('msgForm');
const refreshButton = document.getElementById('refresh');

// 防止 XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        "'": '&#39;', '"': '&quot;'
    }[tag]));
}

// 撤回消息函数
async function retractMessage(id) {
    const token = localStorage.getItem(`msg_token_${id}`);
    if (!token) {
        alert("无法找到撤回令牌，撤回失败");
        return;
    }
    try {
        const res = await fetch(`/admin/messages/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        if (!res.ok) {
            let errMsg = "撤回失败";
            try {
                const errData = await res.json();
                errMsg = errData.message || errMsg;
            } catch {
                try {
                    errMsg = await res.text();
                } catch {}
            }
            alert(errMsg);
            return;
        }
        localStorage.removeItem(`msg_token_${id}`);
        form.reset();
        await loadAllMessages();  // 撤回成功后完整刷新
    } catch (err) {
        alert("撤回请求失败");
        console.error(err);
    }
}

// 更新 UI，替换内容
function renderMessages(msgs) {
    if (msgs.length === 0) {
        messagesContainer.innerHTML = '';
        lastMessagesHTML = '';
        lastMessageTime = "1970-01-01T00:00:00Z";
        return;
    }
    const newHTML = msgs.map(m => `
        <div class="message-item" data-id="${m.id}">
            <strong>${escapeHTML(m.name)}</strong>
            <button class="btn-retract" onclick="retractMessage('${m.id}')">撤回</button>
            <p>${escapeHTML(m.message)}</p>
            <small>${new Date(m.created_at).toLocaleString()}</small>
        </div>
    `).join('');

    if (newHTML !== lastMessagesHTML) {
        messagesContainer.innerHTML = newHTML;  // 替换，不追加
        lastMessagesHTML = newHTML;
    }

    lastMessageTime = msgs[0].created_at;
}

// 请求并渲染所有留言（完整刷新）
async function loadAllMessages() {
    try {
        const res = await fetch('/admin/messages');
        if (!res.ok) throw new Error('获取全部留言失败');
        const msgs = await res.json();
        renderMessages(msgs);
        lastMessageTime = msgs.length > 0 ? msgs[0].created_at : "1970-01-01T00:00:00Z";
    } catch (err) {
        console.error(err);
    }
}

// 长轮询函数（可以留着，也可以移除或改为定时刷新）
async function longPollMessages() {
    try {
        const res = await fetch(`/admin/messages?since=${encodeURIComponent(lastMessageTime)}`);
        const msgs = await res.json();
        if (msgs.length > 0) {
            renderMessages(msgs);
        }
    } catch (err) {
        console.error("长轮询出错", err);
        await new Promise(r => setTimeout(r, 3000)); // 出错时等3秒重试
    } finally {
        longPollMessages();
    }
}

// 提交留言
form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
        const res = await fetch('/admin/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            alert("提交失败，请重试");
            return;
        }
        const result = await res.json();
        // 存储token
        if (result.id && result.token) {
            localStorage.setItem(`msg_token_${result.id}`, result.token);
        }
        form.reset();
        await loadAllMessages();  // 提交成功后完整刷新
    } catch (err) {
        alert("提交失败，请重试");
        console.error(err);
    }
});

// 刷新按钮事件
refreshButton.addEventListener('click', async function () {
    await loadAllMessages();
    this.textContent="刷新完成";
    setTimeout(() => this.textContent = '刷新', 1500);
});

// 初始化时完整加载一次留言
loadAllMessages();