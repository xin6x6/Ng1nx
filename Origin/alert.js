const alertWin = document.querySelector('.alert');
const confirm = document.querySelector('.alert-confirm');

alert.addEventListener("mousedown", () => {
    alert.addEventListener("mousemove", () => {

    });
});

confirm.addEventListener("click", () => {
    alert("a");
    alertWin.style.display = "none";
});