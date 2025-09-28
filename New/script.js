
// notification
const confirmNotification = document.getElementById('confirmNotification');
const notification = document.querySelector('.notification-container');
confirmNotification.addEventListener('click', function(){
    notification.style.display = 'none';
});
function showNotification() {
    notification.style.display = 'flex';
    console.log('showNotification');
}


//sub-nav
const subnav = document.querySelectorAll('.sub-nav').forEach(el => {
    el.addEventListener('click', (e) => {
        const name = el.dataset.url;
        const url = "./sub-nav/" + name + "/index.html";
        window.open(url, "_blank");
    })
});

//rickRollStuff
const rickRoll = document.getElementById('rickRoll');
function rickRollStuff() {
    rickRoll.play();
    rickRoll.style.display = 'flex';
}