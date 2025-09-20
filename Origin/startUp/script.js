const startingLogo = document.getElementById("startingLogo");
const barEmpty = document.getElementById("barEmpty");
const barFull = document.getElementById("barFull");
const startUpAudio = document.getElementById("startUpAudio");
let random = Math.random() / 3;
console.log(random);

if (window.requestFullscreen) {
    window.requestFullscreen();
} else if (window.webkitRequestFullscreen) { // Safari
    window.webkitRequestFullscreen();
} else if (window.msRequestFullscreen) { // IE
    window.msRequestFullscreen();
}

function barFill() {
    barEmpty.style.opacity = "100";
    setTimeout(() => { //bar fill
        barFull.style.opacity = "100";
        for (let i = 0; i < 10000; i++) {
            setTimeout(() => {
                barFull.style.width = (i / 10000) * 250 + "px";
            }, i * random);

            if (i >= 9999) {
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            }
        }
    }, 1500);


}

setTimeout(() => { //logo delay


    startUpAudio.muted = false;
    try {
        startUpAudio.play();
    } catch (err) {
        console.log(err);
        setTimeout(() => {
            barFill();
        }, 2000);
    }
    startingLogo.style.opacity = "100";
    // bar funcs
    startUpAudio.addEventListener("ended", () => { // show bar when ended audio
        barFill();
    });



}, 1000);
