let lastMessagesHTML = '';
let lastMessageTime = "1970-01-01T00:00:00Z"; // 记录最新消息时间
const messagesContainer = document.getElementById('messages');
const form = document.getElementById('msgForm');
const refreshButton = document.getElementById('refresh');

// 更新 UI
function renderMessages(msgs) {
    if (msgs.length === 0) return;
    const newHTML = msgs.map(m => `
        <div class="message-item">
            <strong>${escapeHTML(m.name)}</strong>
            <p>${escapeHTML(m.message)}</p>
            <small>${new Date(m.created_at).toLocaleString()}</small>
        </div>
    `).join('');

    if (newHTML !== lastMessagesHTML) {
        messagesContainer.insertAdjacentHTML('afterbegin', newHTML);
        lastMessagesHTML = messagesContainer.innerHTML;
    }

    // 更新最新时间
    lastMessageTime = msgs[0].created_at;
}

// 长轮询函数
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
        await fetch('/admin/messages', { // changes
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        form.reset();
        longPollMessages();
    } catch (err) {
        alert("提交失败，请重试");
        console.error(err);
    }
});

// 防止 XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        "'": '&#39;', '"': '&quot;'
    }[tag]));
}

refreshButton.addEventListener('click', async function () {
    lastMessageTime = "1970-01-01T00:00:00Z"; // 手动刷新时强制重新加载全部
    messagesContainer.innerHTML = "";
    longPollMessages();
    this.textContent="刷新完成";
    setTimeout(() => this.textContent = '刷新', 1500);
});

// 初始化
longPollMessages();