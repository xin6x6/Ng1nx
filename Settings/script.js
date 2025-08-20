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

            case 'Sounds':
                content.innerHTML = `
                <h1>Sounds</h1>
                <link rel="stylesheet" href="style.css">
                <div class="settings-item neon-switch-container">
                        <label for="error-sound">Error Sound</label>
                        <select id="errorSoundSelect">
                            <option value="Boop">Boop</option>
                            <option value="Basso">Basso</option>
                            <option value="Blow">Blow</option>
                            <option value="Bottle">Bottle</option>
                            <option value="Frog">Frog</option>
                            <option value="Funk">Funk</option>
                            <option value="Glass">Glass</option>
                            <option value="Hero">Hero</option>
                            <option value="Morse">Morse</option>
                            <option value="Ping">Ping</option>
                            <option value="Pop">Pop</option>
                            <option value="Sosumi">Sosumi</option>
                            <option value="Submarine">Submarine</option>
                        </select>
                    </div>
                `;
                const errorSoundSelection = document.getElementById("errorSoundSelect");
                document.addEventListener("keydown", () => {
                    console.log("keydown");
                    const errorSoundAiff = new Audio(`../sound/error/aiff/${errorSoundSelection.value}.aiff`);
                    const errorSoundWav = new Audio(`../sound/error/wav/${errorSoundSelection.value}.wav`);

                    errorSoundAiff.play().catch(() => {
                        errorSoundWav.play();
                    });
                })
                break;
            default:
                content.innerHTML = `<h1>${label}</h1><p>There's nothing in ${label}.</p>`;
        }
    });
});