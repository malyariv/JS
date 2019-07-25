'use strict';
let mi = document.getElementsByClassName("menu-item"),
    m = document.getElementsByClassName("menu").item(0);
let el = m.replaceChild(mi[1], mi[2]);
m.insertBefore(el, mi[1]);
let e = el.cloneNode(true);
e.textContent = "Пятый пункт";
m.appendChild(e);

let uri = document.baseURI.slice(0,-10)+"img/apple_true.jpg";
document.body.style.background = "url("+uri+")";

document.getElementById("title").textContent = "Мы продаем только подлинную технику Apple";

document.getElementsByClassName("adv").item(0).remove();

let answer = prompt("Что вы думаете о технике от Apple?", "");
document.getElementById("prompt").textContent = answer;
