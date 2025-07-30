const win = document.getElementById("window");
const titleBar = document.getElementById("title-bar");
const resizer = document.querySelector(".resizer");

let minimized = false;
let maximized = false;
let isDragging = false;
let isResizing = false;
let offsetX = 0;
let offsetY = 0;

let previousPosition = {
  top: win.style.top,
  left: win.style.left,
  width: win.style.width,
  height: win.style.height
};

titleBar.addEventListener("mousedown", (e) => {
  if (maximized || minimized) return;
  isDragging = true;
  offsetX = e.clientX - win.offsetLeft;
  offsetY = e.clientY - win.offsetTop;
  win.style.transition = "none";
});

resizer.addEventListener("mousedown", (e) => {
  e.stopPropagation();
  if (maximized || minimized) return;
  isResizing = true;
  offsetX = e.clientX;
  offsetY = e.clientY;
  win.style.transition = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    const winWidth = win.offsetWidth;
    const winHeight = win.offsetHeight;
    const maxLeft = window.innerWidth - winWidth;
    const maxTop = window.innerHeight - winHeight;

    win.style.left = `${Math.min(Math.max(0, newLeft), maxLeft)}px`;
    win.style.top = `${Math.min(Math.max(29, newTop), maxTop)}px`;
  } else if (isResizing) {
    let newWidth = win.offsetWidth + (e.clientX - offsetX);
    let newHeight = win.offsetHeight + (e.clientY - offsetY);

    const minWidth = 300;
    const minHeight = 200;
    const maxWidth = window.innerWidth - win.offsetLeft;
    const maxHeight = window.innerHeight - win.offsetTop;

    win.style.width = `${Math.min(Math.max(newWidth, minWidth), maxWidth)}px`;
    win.style.height = `${Math.min(Math.max(newHeight, minHeight), maxHeight)}px`;

    offsetX = e.clientX;
    offsetY = e.clientY;
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging || isResizing) {
    isDragging = false;
    isResizing = false;
    win.style.transition = "all 0.4s cubic-bezier(0.5, 0, 0, 1), opacity 0.4s cubic-bezier(1, 0.8, 0.5, 0)";
  }
});

function closeWindow() {
  win.style.display = "none";
}

function openWindow() {
  win.style.display = "flex";
  win.style.opacity = "1";
}

function fadeOutWindow() {
  win.style.opacity = "0";
}

function fadeInWindow() {
  win.style.opacity = "1";
}

function Minimize(){
    previousPosition = {
      top: win.style.top,
      left: win.style.left,
      width: win.style.width,
      height: win.style.height
    };
    win.style.top = "calc(100% - 50px)";
    win.style.left = "calc(50%)";
    win.style.width = "0px";
    win.style.height = "0px";
    win.style.overflow = "hidden";
    fadeOutWindow();
    minimized = true;
    maximized = false;
}

function Maximize(){
    previousPosition = {
      top: win.style.top,
      left: win.style.left,
      width: win.style.width,
      height: win.style.height
    };
    win.style.top = "60px";
    win.style.left = "40px";
    win.style.width = "calc(100% - 80px)";
    win.style.height = "calc(100% - 160px)";
    win.style.borderRadius = "25px";
    maximized = true;
    minimized = false;
}

function Resize(){
    if (!minimized) {
      previousPosition = {
        top: win.style.top,
        left: win.style.left,
        width: win.style.width,
        height: win.style.height
      };
    } else {
      openWindow();
      win.style.top = previousPosition.top;
      win.style.left = previousPosition.left;
      win.style.width = previousPosition.width;
      win.style.height = previousPosition.height;
      win.style.overflow = "hidden";
      fadeInWindow();
      minimized = false;
    }
}

function toggleMinimize() {
  if (!minimized) {
    previousPosition = {
      top: win.style.top,
      left: win.style.left,
      width: win.style.width,
      height: win.style.height
    };
    win.style.top = "calc(100% - 50px)";
    win.style.left = "calc(50%)";
    win.style.width = "0px";
    win.style.height = "0px";
    win.style.overflow = "hidden";
    fadeOutWindow();
    minimized = true;
    maximized = false;
  } else {
    openWindow();
    win.style.top = previousPosition.top;
    win.style.left = previousPosition.left;
    win.style.width = previousPosition.width;
    win.style.height = previousPosition.height;
    win.style.overflow = "hidden";
    fadeInWindow();
    minimized = false;
  }
}

function toggleMaximize() {
  if (!maximized) {
    previousPosition = {
      top: win.style.top,
      left: win.style.left,
      width: win.style.width,
      height: win.style.height
    };
    win.style.top = "60px";
    win.style.left = "40px";
    win.style.width = "calc(100% - 80px)";
    win.style.height = "calc(100% - 160px)";
    win.style.borderRadius = "25px";
    maximized = true;
    minimized = false;
  } else {
    win.style.top = previousPosition.top;
    win.style.left = previousPosition.left;
    win.style.width = previousPosition.width;
    win.style.height = previousPosition.height;
    win.style.borderRadius = "25px";
    maximized = false;
  }
}
