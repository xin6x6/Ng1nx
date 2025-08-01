document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");

    // 初始淡入
    setTimeout(() => {
        title.style.opacity = 1;
    }, 100);

    // 滚动时淡出标题
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const fadeDistance = 200;
        const newOpacity = Math.max(0, 1 - scrollY / fadeDistance);
        title.style.opacity = newOpacity;
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