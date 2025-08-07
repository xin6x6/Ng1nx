document.addEventListener("DOMContentLoaded", () => {
    const apps = document.querySelectorAll(".launchpad-app");

    apps.forEach(app => {
        app.addEventListener("click", () => {
            const appName = app.dataset.app;
            alert(`Launching ${appName}`);
            // 可扩展：打开对应的窗口、执行函数、跳转页面等
        });
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        parent.document.getElementById("window-LaunchPad").style.display = "none";
    }
});