// 输入框引用
const Bina = document.getElementById('Bin');
const Octa = document.getElementById('Oct');
const Deci = document.getElementById('Dec');
const Hexa = document.getElementById('Hex');

// 工具函数：把字符串解析成十进制数字
function parseInput(value, base) {
    const num = parseInt(value, base);
    return isNaN(num) ? null : num;
}

// 更新所有输入框（除了来源框）
function updateAll(from, value) {
    // 如果输入框为空，清空所有输入框
    if (value.trim() === "") {
        Bina.value = "";
        Octa.value = "";
        Deci.value = "";
        Hexa.value = "";
        return;
    }

    let num;
    switch(from) {
        case 'Bin': num = parseInt(value, 2); break;
        case 'Oct': num = parseInt(value, 8); break;
        case 'Dec': num = parseInt(value, 10); break;
        case 'Hex': num = parseInt(value, 16); break;
    }

    if (isNaN(num)) return; // 非法输入不更新

    if (from !== 'Bin') Bina.value = num.toString(2);
    if (from !== 'Oct') Octa.value = num.toString(8);
    if (from !== 'Dec') Deci.value = num.toString(10);
    if (from !== 'Hex') Hexa.value = num.toString(16).toUpperCase();
}

// 绑定事件
Bina.addEventListener('input', e => updateAll('Bin', e.target.value));
Octa.addEventListener('input', e => updateAll('Oct', e.target.value));
Deci.addEventListener('input', e => updateAll('Dec', e.target.value));
Hexa.addEventListener('input', e => updateAll('Hex', e.target.value));

