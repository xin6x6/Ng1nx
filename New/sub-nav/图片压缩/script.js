const submit = document.getElementById("submit");
const submitContainer = document.querySelector(".submit-container");
const compressDegree = document.getElementById("compress-degree");
const download = document.getElementById("download");
const qualityLabel = document.getElementById("qualityLabel");


// import FFmpeg from './ffmpeg';

let fileLength,
    fileName,
    quality = 50,
    uploadedFile = null;

submit.addEventListener("change", () => {
    fileName = submit.files[0].name;
    console.log(fileName);
    fileLength = submit.files.length;
    if (fileLength > 0) {
        uploadedFile = true;
        submitContainer.style.setProperty("--icon114", '"✓"');
    } else {
        submitContainer.style.setProperty("--icon114", '"+"');
        uploadedFile = false;
    }
});

compressDegree.addEventListener("mousemove", () => {
    quality = compressDegree.value;
    qualityLabel.innerHTML = `压缩程度: ${quality}`;
});


download.addEventListener("click", () => {
    if (uploadedFile) {
        const link = document.createElement("a");
        link.href = "../../src/pic/comingSoon.png";
        link.download = fileName;
        link.click();
    } else {
        download.innerText = "请提交文件!";
        setTimeout(() => {
            download.innerText = "转换并下载";
        }, 2000);
    }
});
//



const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

download.addEventListener("click", async (e) => {
    await ffmpeg.load();
    if (fileLength >= 0) {

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }
    }
})
