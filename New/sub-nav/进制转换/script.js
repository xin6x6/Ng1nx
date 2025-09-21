const Bina = document.getElementById('Bin');
const Octa = document.getElementById('Oct');
const Deci = document.getElementById('Dec');
const Hexa = document.getElementById('Hex');

function refresh() {
    var Bin = Bina.value,
        Oct = Octa.value,
        Dec = Deci.value,
        Hex = Hexa.value,;
    console.log(Bin);

    setTimeout(refresh, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    refresh();
})