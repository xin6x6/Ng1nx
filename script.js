let topZIndex = 1;
const dock = document.getElementById("dock");

let minimized = false;
let maximized = false;
let isDragging = false;
let isResizing = false;
let isDockHided = false;
let offsetX = 0;
let offsetY = 0;
let currentFocus = "";

let previousPosition = {};

function setupWindow(win) {
  const titleBar = win.querySelector(".title-bar");

  titleBar.addEventListener("click", () => {
    console.log("focus: " + win.id);
    currentFocus = win.id;
  });



  titleBar.addEventListener("mousedown", (e) => {
    if (maximized || minimized) return;
    isDragging = true;
    win.style.transition = "none";
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;


    const onMouseMove = (e) => {

      if (isDragging) {
        e.stopPropagation();
        win.style.transition = "none";
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const winWidth = win.offsetWidth;
        const winHeight = win.offsetHeight;
        const maxLeft = window.innerWidth - winWidth;
        const maxTop = window.innerHeight - winHeight;

        win.style.left = `${Math.min(Math.max(0, newLeft), maxLeft)}px`;
        win.style.top = `${Math.min(Math.max(29, newTop), maxTop)}px`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      win.style.transition = "transform 0.3s cubic-bezier(0.5, 0, 0, 1), opacity 0.3s cubic-bezier(0.8, 0.6, 0.4, 0)";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  const red = win.querySelector("#red-btn");
  const yellow = win.querySelector("#yellow-btn");
  const green = win.querySelector("#green-btn");

  setupTrafficButton(red, "close", closeWindow);
  setupTrafficButton(yellow, "minimize", minimizeToDock);
  setupTrafficButton(green, "maximize", toggleMaximize);

  titleBar.addEventListener("dblclick", () => {
    green.click();
  });

  // 找到对应的 dock 图标
  const dockIcon = document.querySelector(`#dock-app-icon[data-window-id="${win.id}"]`);
  if (dockIcon) {
    dockIcon.addEventListener("click", () => {
      if (win.dataset.minimized === "true" || win.style.display === "none") {
        win.style.display = "flex";
        win.style.transition = "none";
        win.style.transform = `scale(0.1)`;
        win.style.opacity = "0";
        void win.offsetWidth;
        win.style.transition = "transform 0.3s cubic-bezier(0.5, 0, 0, 1), opacity 0.3s cubic-bezier(0.8, 0.6, 0.4, 0)";
        win.style.transform = "scale(1)";
        win.style.opacity = "1";
        win.dataset.minimized = "false";
      }
    });
  }




  //window
  function closeWindow() {
    win.style.display = "none";
    showDock();
  }

  //dock
  // minimize to dock
  function minimizeToDock() {
    showDock();
    const iconRect = dockIcon.getBoundingClientRect();
    const winRect = win.getBoundingClientRect();
    const targetX = iconRect.left + iconRect.width / 2 - winRect.width / 2;
    const targetY = iconRect.top + iconRect.height / 2 - winRect.height / 2;


    win.style.transition = "all 0.4s cubic-bezier(0.5, 0, 0, 1)";
    win.style.transformOrigin = "center center";
    win.style.transform = `translate(${targetX - winRect.left}px, ${targetY - winRect.top}px) scale(0.1)`;
    win.style.opacity = "0";

    setTimeout(() => {
      win.style.display = "none";
      win.dataset.minimized = "true";
    }, 400);
  }
  // maximize
  function toggleMaximize() {
    toggleHideDock();
    if (!maximized) {
      win.style.transition = "all 0.4s cubic-bezier(0.5, 0, 0, 1)";
      previousPosition = {
        top: win.style.top,
        left: win.style.left,
        width: win.style.width,
        height: win.style.height
      };
      win.style.top = "3px";
      win.style.left = "10px";
      win.style.width = "calc(100% - 20px)";
      win.style.height = "calc(100% - 10px)";
      win.style.borderRadius = "25px";
      maximized = true;
    } else {
      win.style.transition = "all 0.4s cubic-bezier(0.5, 0, 0, 1)";
      win.style.top = previousPosition.top;
      win.style.left = previousPosition.left;
      win.style.width = previousPosition.width;
      win.style.height = previousPosition.height;
      win.style.borderRadius = "25px";
      maximized = false;
    }
    setTimeout(() => {
      win.style.transition = "transform 0.3s cubic-bezier(0.5, 0, 0, 1), opacity 0.3s cubic-bezier(0.8, 0.6, 0.4, 0)";
    }, 400);

  }




  // Bring window to top when clicked
  win.addEventListener("mousedown", () => {
    topZIndex++;
    win.style.zIndex = topZIndex;
  });

  // Bring window to top when its iframe is interacted with
  win.querySelectorAll(".iframe-content").forEach(iframe => {
    iframe.addEventListener("pointerdown", () => {
      topZIndex++;
      win.style.zIndex = topZIndex;
    });
  });

  function setupTrafficButton(btn, baseName, onClick, windows = win) {

    btn.addEventListener("mouseover", () => {
      btn.src = `icon/${baseName}Hover.svg`;
    });
    btn.addEventListener("mouseout", () => {
      btn.src = `icon/${baseName}Normal.svg`;
    });
    btn.addEventListener("mousedown", () => {
      btn.src = `icon/${baseName}Press.svg`;
    });
    btn.addEventListener("mouseup", () => {
      btn.src = `icon/${baseName}Hover.svg`;
    });
    win.addEventListener("blur", () => {
      btn.src = `noFocus.svg`;
    });
    btn.addEventListener("click", onClick);


  }

  document.querySelectorAll("#dock-app-icon").forEach(icon => {
    icon.addEventListener("click", () => {
      const app = icon.dataset.windowId;

      if (app === "window-LaunchPad") {
        const overlay = document.getElementById("window-LaunchPad");
        overlay.style.display = "block";
      }
    });
  });

}



// hideDock
function toggleHideDock() {
  if (!isDockHided) {
    hideDock();
  } else {
    showDock();
  }
}
function hideDock() {
  dock.style.top = "80px";
  isDockHided = true;
}
function showDock() {
  dock.style.top = "0px";
  isDockHided = false;
}

document.querySelectorAll(".macos-window").forEach(setupWindow);
