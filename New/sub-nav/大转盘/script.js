const textArea = document.getElementById("choosingObject");
const spinner = document.getElementById("spinner");
const button = document.getElementById("startSpin");
let currentRotatedDeg = 720;
let currentAngle, content, length;

//spin
// button.addEventListener("click", () => {
//     let randomNum = Math.random();
//     spinner.style.transform = `rotate(${currentRotatedDeg}deg)`;
//     let absoluteCurrentDeg = currentRotatedDeg % 360;
//     currentRotatedDeg += 720*10*randomNum;
//
//     const spans = document.querySelectorAll(".spins");
//     spans.forEach((span) => {
//         const num = span.dataset.spinid;
//         const leftBound = num * currentAngle - currentAngle/2;
//         const rightBound = num * currentAngle + currentAngle/2;
//
//         console.log("; left: " + leftBound + "; right: " + rightBound + "; absDeg: " + absoluteCurrentDeg );
//
//         if (leftBound <= absoluteCurrentDeg && absoluteCurrentDeg < rightBound) {
//             console.log(span.innerHTML);
//         }
//     });
//
// });

button.addEventListener("click", () => {
    const randomNum = Math.random();
    const perAngle = 360/length;
    spinner.style.transform = `rotate(${currentRotatedDeg}deg)`;

    const absoluteCurrentDeg = currentRotatedDeg % 360;
    const spans = document.querySelectorAll(".spins");

    spans.forEach(span => {
        const num = parseInt(span.dataset.spinid);
        const centerAngle = (num * perAngle - perAngle/2) + 90;
        const leftBound = (centerAngle - perAngle/2) % 360;

        const rightBound = (centerAngle + perAngle/2) % 360;

        console.log("; left: " + leftBound + "; right: " + rightBound + "; absDeg: " + absoluteCurrentDeg + "; centerAng: " + centerAngle );

        // JS 条件用 && 而不是 < 链式比较
        if (absoluteCurrentDeg >= leftBound && absoluteCurrentDeg < rightBound) {
            console.log("抽中:", span.innerText);
        }
    });

    currentRotatedDeg += 720 * 10 * randomNum;
});

//1 choice range: crt [crt - currentAngle/2, crt + currentAngle/2)

function updateSpinner(value) {
    content = value.split("\n").filter(line => line.trim() !== "");
    length = content.length;
    spinner.innerHTML = "";
    for (let i = 1; i <= length; i++) {
        currentAngle = 360/i;

        spinner.innerHTML +=
            `<span class="spins" data-spinid="${i}" > <h2> ${content[i-1]} </h2> </span>`;

        const currentSpans = document.querySelectorAll(".spins");

        currentSpans.forEach((span) => {
            const num = span.dataset.spinid;
            span.style.transform = "rotate(" + currentAngle * num  + "deg)";
            span.style.setProperty("--lineRotateDeg", `${currentAngle/2}deg`);
        });

    }
}

textArea.addEventListener("input", e => updateSpinner(e.target.value));