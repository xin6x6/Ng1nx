document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");

    // 初始淡入
    setTimeout(() => {
        doChangeMacContent();
        console.log(random);
        title.style.opacity = 1;
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

let ableToRick = true;

//pTable
const pTable = document.getElementById("pTable");
let random = Math.random();
const video = document.getElementById("rickVideo");

pTable.addEventListener("click", () => {
    if(random*100 > 75 & ableToRick){
        video.muted = false; // 取消静音
        video.volume = 1.0; // 最大音量
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
    } else {
        window.location.href='https://ptable.com/#Properties';
    }


});

//macBook
const mac = document.getElementById("macBook");
const touchPad = document.getElementById("touchPad");
const macScreenContents = document.getElementById("contents");

mac.addEventListener("mouseenter", () => {

});

function doChangeMacContent() { 
    if (random*100 > 75 & ableToRick) {
        macScreenContents.src = "../icon/folderQmark.png";
        //
        macScreenContents.style.position="relative";
        macScreenContents.style.width="130px";
        macScreenContents.style.height="74px";
        macScreenContents.style.top="0px";
        macScreenContents.style.left="0px";

    } else {
        macScreenContents.src = "../icon/apple.png";
        //
        macScreenContents.style.position="relative";
        macScreenContents.style.left="calc(50% - 5px)";
        macScreenContents.style.top="calc(50% - 10px)";
        macScreenContents.style.width="10px";
        macScreenContents.style.height="10px";
    }
}

mac.addEventListener("click", () => {
    console.log(ableToRick);
    ableToRick = !ableToRick;
    doChangeMacContent();

    if (ableToRick) { 
        touchPad.style.background = "#cdcdcd";
    } else {
        touchPad.style.background = "#ca7575ff";
    }
});