document.addEventListener('DOMContentLoaded', () => {
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });

    const fileInput = document.getElementById('fileInput');
    const chooseFilesBtn = document.getElementById('chooseFilesBtn');
    const fileList = document.getElementById('fileList');
    const formatSelect = document.getElementById('formatSelect');
    const downloadAllBtn = document.getElementById('downloadAllBtn');

    let convertedFiles = [];

    // 点击按钮选择文件
    chooseFilesBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // 文件选择后处理
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        }
    });

    async function handleFiles(files) {
        if (!ffmpeg.isLoaded()) {
            console.log('正在加载 FFmpeg...');
            await ffmpeg.load();
            console.log('FFmpeg 加载完成');
        }

        for (let file of files) {
            const outputFormat = formatSelect.value;
            const outputName = file.name.replace(/\.[^/.]+$/, "") + '.' + outputFormat;

            const statusDiv = document.createElement('div');
            statusDiv.className = 'file-item';
            statusDiv.textContent = `正在转换 ${file.name} ...`;
            fileList.appendChild(statusDiv);

            // 写入 FFmpeg FS
            ffmpeg.FS('writeFile', file.name, await fetchFile(file));
            await ffmpeg.run('-i', file.name, outputName);
            const data = ffmpeg.FS('readFile', outputName);
            const blob = new Blob([data.buffer], { type: `audio/${outputFormat}` });
            const url = URL.createObjectURL(blob);

            // 更新为可下载状态
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

    // 下载全部
    downloadAllBtn.addEventListener('click', () => {
        convertedFiles.forEach(f => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(f.blob);
            a.download = f.name;
            a.click();
        });
    });
});