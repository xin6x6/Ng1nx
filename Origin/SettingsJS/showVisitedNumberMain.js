const channel = new BroadcastChannel('settings_channel');

function updateVisitedCntVisibility() {
    const show = localStorage.getItem('showVisitedNumber');
    const visitedCnt = document.getElementById('page_uv');
    if (!visitedCnt) return;
    
    if (show == 'false') {
        visitedCnt.style.display = 'none';
    } else {
        visitedCnt.style.display = 'flex';
    }
}

updateVisitedCntVisibility();

channel.addEventListener('message', e => {
    if (e.data.type == 'showVisitedNumber') {
        updateVisitedCntVisibility();
    }
});