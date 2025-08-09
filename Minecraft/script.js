// Basic interactions: copy IP, show modal, join button
document.getElementById('copy-ip').addEventListener('click', async function () {
    const ip = document.getElementById('server-ip').textContent.trim();
    try {
        await navigator.clipboard.writeText(ip);
        this.textContent = '已复制!';
        setTimeout(() => this.textContent = '复制地址', 1500);
    } catch (e) {
        alert('无法复制：' + ip);
    }
});

// Modal
const modalBack = document.getElementById('modal-back');
document.getElementById('open-rules').addEventListener('click', () => modalBack.style.display = 'flex');
document.getElementById('close-modal').addEventListener('click', () => modalBack.style.display = 'none');
modalBack.addEventListener('click', (e) => { if (e.target === modalBack) modalBack.style.display = 'none' });

// // Join button behaviour (attempt to open minecraft:// or show instructions)
// function tryOpenMinecraft() {
//     // try to open the minecraft protocol (desktop) — browsers often block, so gracefully fallback
//     const ip = document.getElementById('server-ip').textContent.trim();
//     // show a small prompt with instructions
//     const confirmed = confirm('要尝试打开 Minecraft 并连接到 ' + ip + ' 吗？（如果没有反应，请手动在客户端连接）');
//     if (confirmed) {
//         // attempt custom protocol (may be blocked)
//         window.location.href = 'minecraft://?addExternalServer=Luobo%20Minecraft&server=' + encodeURIComponent(ip);
//     }
// }
// document.getElementById('join-btn').addEventListener('click', function (e) { e.preventDefault(); tryOpenMinecraft(); });
// document.getElementById('big-join').addEventListener('click', function (e) { e.preventDefault(); tryOpenMinecraft(); });

// lightweight "online players" demo: (this would be replaced by real server query)
function updatePlayersDemo() {
    const ip = document.getElementById('server-ip').textContent.trim();
    const el = document.querySelector('.server-box div[style*="text-align:right"] div:nth-child(2)');
    fetch('https://api.mcsrvstat.us/2/' + ip)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                el.textContent = data.players.online + ' / ' + data.players.max;
            } else {
                el.textContent = '离线';
            }
        })
        .catch(() => {
            el.textContent = '离线';
        });
}
updatePlayersDemo(); setInterval(updatePlayersDemo, 8000);

// Replace screenshot placeholders with images if the site owner provides links via JS variable
(function () {
    if (window.__LM_SCREENSHOTS && Array.isArray(window.__LM_SCREENSHOTS)) {
        const shots = document.querySelectorAll('.shot');
        shots.forEach((s, i) => { if (window.__LM_SCREENSHOTS[i]) { s.style.backgroundImage = 'url(' + window.__LM_SCREENSHOTS[i] + ')'; s.style.backgroundSize = 'cover'; s.textContent = ''; } });
    }
})();
