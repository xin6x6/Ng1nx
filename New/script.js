
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


// menu
let doShowCustomMenu = true;
// no right click
const area = document.querySelector(".body-container");
const menu = document.getElementById("menu");

document.addEventListener("contextmenu", (e) => {
    doShowCustomMenu ? e.preventDefault(): doShowCustomMenu = !doShowCustomMenu;
}); // disable original menu

area.addEventListener("contextmenu", (e) => {
    if (doShowCustomMenu) {
        e.preventDefault();
        menu.style.opacity = "100";
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}); // show my menu

document.addEventListener("click", () => {
    menu.style.opacity = "0";
    menu.style.display = "none";
}); // close my menu

// function of menu
const refresh = document.getElementById("refresh").addEventListener("click", () => {
    location.reload();
});
const F12 = document.getElementById("F12").addEventListener("click", ()=> {
    doShowCustomMenu = !doShowCustomMenu;

});






