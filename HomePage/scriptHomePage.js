const welcomeText = document.getElementById("welcomeText");
const video = document.getElementById("rickVideo");

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

    //
        const triggerPoint = 200; // 设置触发滚动位置，比如滚动到 200px

    if (window.scrollY > triggerPoint && video.paused) {
        video.muted = false; // 取消静音
        video.volume = 1; // 最大音量
        video.style.display = "block";

        video.play().then(() => {
        // 请求全屏
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { // Safari
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE
            video.msRequestFullscreen();
        }
        }).catch((err) => {
        console.warn("自动播放失败:", err);
        });
    }
});