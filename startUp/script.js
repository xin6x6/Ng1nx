const startingLogo = document.getElementById("startingLogo");
const barEmpty = document.getElementById("barEmpty");
const barFull = document.getElementById("barFull");
setTimeout(() => {
    startingLogo.style.opacity = "100";

    setTimeout(() => {
        barEmpty.style.opacity = "100";
        setTimeout(() => {
            barFull.style.opacity = "100";
            for (let i = 0; i < 100; setTimeout(() => {i++}, 300)){
                barFull.style.width = (i/100) * 250 + "px";
            }
        }, 1500);
    }, 100);

}, 1000);

