const sidebarItems = document.querySelectorAll('.sidebar-item');
const content = document.querySelector('.content');

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.sidebar-item.active')?.classList.remove('active');
        item.classList.add('active');

        const label = item.textContent.trim();
        content.innerHTML = `<h1>${label}</h1><p>There's nothing in ${label}.</p>`;
    });
});