document.addEventListener('DOMContentLoaded', () => {
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });

    const dropZone = document.getElementById('dropZone');
    const dropText = document.getElementById('dropText');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const formatSelect = document.getElementById('formatSelect');
    const downloadAllBtn = document.getElementById('downloadAllBtn');

    let convertedFiles = [];

    // 文件选择后处理
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        }
    });

    async function handleFiles(files) {
        if (!ffmpeg.isLoaded()) await ffmpeg.load();

        for (let file of files) {
            const outputFormat = formatSelect.value;
            const outputName = file.name.replace(/\.[^/.]+$/, "") + '.' + outputFormat;

            const statusDiv = document.createElement('div');
            statusDiv.className = 'file-item';
            statusDiv.textContent = `正在转换 ${file.name} ...`;
            fileList.appendChild(statusDiv);

            ffmpeg.FS('writeFile', file.name, await fetchFile(file));
            await ffmpeg.run('-i', file.name, outputName);
            const data = ffmpeg.FS('readFile', outputName);
            const blob = new Blob([data.buffer], { type: `audio/${outputFormat}` });
            const url = URL.createObjectURL(blob);

            statusDiv.innerHTML = `
                <span>${file.name} → ${outputName}</span>
                <button>下载</button>
            `;
            const btn = statusDiv.querySelector('button');
            btn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = outputName;
                a.click();
            };

            convertedFiles.push({ blob, name: outputName });
        }
    }

    downloadAllBtn.addEventListener('click', () => {
        convertedFiles.forEach(f => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(f.blob);
            a.download = f.name;
            a.click();
        });
    });
});