
// DOM Manipulation
// Updating Elements

const title = document.querySelector("#heading");

console.log(title);

title.style.color = "red";
title.textContent = "Things WEEEE like to do";

console.log(title);

const items = document.querySelectorAll(".item-list");

console.log(items);

for (let i = 0; i < items.length; i++) {
    items[i].style.fontWeight = "bold";
}
