const textarea = document.getElementById("code");
const codeArea = document.querySelector(".code-area");
// import from "./http_cdnjs.cloudflare.com_ajax_libs_highlight.js_9.12.0_highlight.min"

function adjustHeight() {
    // 重置 textarea 高度
    textarea.style.height = "auto";

    // 设置 textarea 高度为内容高度
    textarea.style.height = textarea.scrollHeight + "px";

    // 设置父容器最小高度以适应 textarea
    codeArea.style.minHeight = textarea.scrollHeight + "px";
}

// 页面加载时初始化
adjustHeight();

// 输入时自动调整高度
textarea.addEventListener("input", adjustHeight);


const code = document.getElementById("code");
hljs.highlightElement(code);
