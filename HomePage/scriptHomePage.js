const welcomeText = document.getElementById("welcomeText");

window.addEventListener("load", () => {
    setTimeout(() => {
        welcomeText.classList.add("visible");
    }, 300);
});

window.addEventListener("scroll", () => {
    const fadeStart = 50;  // 滚动多少像素后开始淡出
    const fadeEnd = 200;   // 滚动到多少像素后完全消失

    const scrollY = window.scrollY;
    const opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
    welcomeText.style.opacity = opacity;
});