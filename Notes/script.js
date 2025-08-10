let lastMessagesHTML = '';
const messagesContainer = document.getElementById('messages');
const form = document.getElementById('msgForm');
const refreshButton = document.getElementById('refresh');

// 加载留言
async function loadMessages() {
    // 保存当前消息 HTML
    let prevHTML = messagesContainer.innerHTML;
    try {
        const res = await fetch('/messages');
        const msgs = await res.json();
        if (msgs.length === 0) {
            if (`<p class="loading">暂无留言</p>` === lastMessagesHTML) {
                return;
            }
            messagesContainer.innerHTML = `<p class="loading">暂无留言</p>`;
            lastMessagesHTML = messagesContainer.innerHTML;
            return;
        }
        const newHTML = msgs.map(m => `
            <div class="message-item">
                <strong>${escapeHTML(m.name)}</strong>
                <p>${escapeHTML(m.message)}</p>
                <small>${new Date(m.created_at).toLocaleString()}</small>
            </div>
        `).join('');
        if (newHTML == lastMessagesHTML) {
            console.log("no change");
            return;
        }
        messagesContainer.innerHTML = newHTML;
        lastMessagesHTML = messagesContainer.innerHTML;
    } catch (err) {
        if (`<p class="loading">加载失败，请稍后再试</p>` == lastMessagesHTML) {
            return;
        }
        messagesContainer.innerHTML = `<p class="loading">加载失败，请稍后再试</p>`;
        lastMessagesHTML = messagesContainer.innerHTML;
        console.error(err);
    }
}

// 提交留言
form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
        await fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        form.reset();
        loadMessages();
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
    loadMessages();
    this.textContent="刷新完成";
    setTimeout(() => this.textContent = '刷新', 1500);
})

// 初始化
loadMessages();
setInterval(loadMessages, 60000);//automatically refresh messages every 60 seconds