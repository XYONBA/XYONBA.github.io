import Rubify from './src/rubify/js/index.js';

let chrStr = '天童爱丽丝';
let rr = new Rubify().complexConv(chrStr);

function genHex() {
    var array = new Uint32Array(2);
    let n = parseInt(window.crypto.getRandomValues(array), 16);
    return parseInt(n.toString().slice(0, 11)).toString(16).toUpperCase();
}

window.onload = () => {
    const elmSelter = (s) => document.querySelector(s);

    elmSelter('.cont.r .mid ruby').innerHTML = rr;
    elmSelter('form#edit .loc select').onchange = v => {
        document.querySelector('form#edit .loc img').src = `./logos/${v.target.value == "Extra" ? "Schale" : v.target.value}.png`;
    }
    elmSelter('form#edit input[type="text"][name="name"]').onchange = v => {
        document.querySelector('form#edit ruby.name.pre').innerHTML = new Rubify().complexConv(v.target.value);
    }
    elmSelter('.editForm a.modal-close').onclick = () => {
        let d = new FormData(document.querySelector('form#edit'));
        const value = Object.fromEntries(d.entries());
        apply(value);
    }
}

function apply(j) {
    if (!j.id) j.id = genHex();

    // 更新学号
    document.querySelector('.cont.r .mid #num').textContent = j.id;

    // 更新社团
    document.querySelector('.cont.r .mid #club').textContent = j.club;

    // 更新生日
    document.querySelector('.cont.r .mid div:nth-child(3) span:last-child').textContent = new Date(j.btd).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });

    // 更新姓名
    document.querySelector('.cont.r .mid #name-ruby').innerHTML = new Rubify().complexConv(j.name);

    // 更新地点图片
    document.querySelector('.cont.r .info .logo.show').src = `./logos/${j.loc == "Extra" ? "Schale" : j.loc}.png`;

    // 更新社团图标
    if (j.clubIcon) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.cont.r .mid .club_img').src = e.target.result;
        };
        reader.readAsDataURL(j.clubIcon);
    }

    // 更新个人图片
    if (j.profileImg) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.cont.r .mid #profile-img').src = e.target.result;
        };
        reader.readAsDataURL(j.profileImg);
    }

    // 调试信息
    console.log('Updated values:', j);
}
