const sidebarItems = document.querySelectorAll('.sidebar-item');
const content = document.querySelector('.content');
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.sidebar-item.active')?.classList.remove('active');
        item.classList.add('active');

        const label = item.textContent.trim();
        switch (label) {
            case 'Appearance':
                content.innerHTML = `
                <h1>Appearance</h1>
<link rel="stylesheet" href="style.css" />
<div class="settings-item neon-switch-container">
    <label for="showVisitedNumber">Show Visited Number</label>
    <label class="switch">
        <input type="checkbox" id="showVisitedNumber" checked>
        <span class="slider"></span>
    </label>
</div>`
                const channel = new BroadcastChannel('settings_channel');
                const checkbox = document.getElementById('showVisitedNumber');

                checkbox.checked = localStorage.getItem('showVisitedNumber') !== 'false'; // 默认开

                checkbox.addEventListener('change', () => {
                    localStorage.setItem('showVisitedNumber', checkbox.checked);
                    channel.postMessage({ type: 'showVisitedNumber', value: checkbox.checked });
                });
                break;

            default:
                content.innerHTML = `<h1>${label}</h1><p>There's nothing in ${label}.</p>`;
        }
    });
});