
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

// no right click
const area = document.querySelector(".body-container");
const menu = document.getElementById("menu");

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});


area.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    menu.style.display = "block";
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
});


document.addEventListener("click", () => {
    menu.style.display = "none";
});

// function of menu
const refresh = document.getElementById("refresh").addEventListener("click", () => {
    location.reload();
});
const F12 = document.getElementById("F12").addEventListener("click", ()=> {
    locatio
});
