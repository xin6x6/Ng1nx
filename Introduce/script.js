document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");

    // 初始淡入
    setTimeout(() => {
        title.style.opacity = 1;
        mainContents.style.opacity = 0;
    }, 100);

    // 滚动时淡出标题
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const fadeDistance = 200;
        const newTitleOpacity = Math.max(0, 1 - scrollY / fadeDistance);
        title.style.opacity = newTitleOpacity;
    });

    // 鼠标跟随漂移
    document.addEventListener("mousemove", (e) => {
        title.style.animation = "none";
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2; // -1 ~ 1
        const y = (e.clientY / innerHeight - 0.5) * 2;
        lastX = e.clientX;
        lastY = e.clientY;

        //title.style.transform += ` rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        title.style.transform = `translateX(${x*3}px) translateY(${y*3}px)`;
    });
    title.style.animation = "floatFancy 10s ease-in-out infinite alternate";


});


//pTable
const pTable = document.getElementById("pTable");
const random = Math.random();
const video = document.getElementById("rickVideo");
pTable.addEventListener("click", (e) => {
    if(random*100 > 75){
        video.muted = false; // 取消静音
        video.volume = 1.0; // 最大音量
        video.style.display = "block";
        setTimeout(() => {
        }, 2000);
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
    } else {
        window.location.href='https://ptable.com/#Properties';
    }


});