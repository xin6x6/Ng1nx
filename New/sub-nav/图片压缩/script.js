const submit = document.getElementById("submit");
const submitContainer = document.querySelector(".submit-container");
const compressDegree = document.getElementById("compress-degree");
const download = document.getElementById("download");
const qualityLabel = document.getElementById("qualityLabel");


// import FFmpeg from './ffmpeg';

let fileNameLength,
    quality = 50,
    uploadedFile = null;

submit.addEventListener("change", () => {
    fileNameLength = submit.files.length;
    if (fileNameLength > 0) {
        submitContainer.style.setProperty("--icon114", '"✓"');
    } else {
        submitContainer.style.setProperty("--icon114", '"+"');
    }
});

compressDegree.addEventListener("mousemove", () => {
    quality = compressDegree.value;
    qualityLabel.innerHTML = `压缩程度: ${quality}`;

});

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

download.addEventListener("click", async (e) => {
    await ffmpeg.load();
    if (fileNameLength >= 0) {

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }
    }
})
