// insert solution here
const menu = document.querySelector(".menu");
const allLinks = document.querySelectorAll("a");

allLinks.forEach((link) => {
    const text = link.innerText;
    if (text.includes("Add")) {
        // adds event listener to addRed, addYellow, addBlue
        link.addEventListener("click", function (event) {
            event.preventDefault();
            handleButton(text)
        });
    } else {
        // changes href from / to # for other menu buttons to prevent website reset
        link.setAttribute("href", "#")
    }
})

function handleButton(text) {
    if (text.includes("Red")) {
        menu.insertAdjacentHTML("afterend", '<div class="section-color red">test</div>') 
    } else if (text.includes("Yellow")) {
        menu.insertAdjacentHTML("afterend", '<div class="section-color yellow">test</div>')
    } else if (text.includes("Blue")) {
        menu.insertAdjacentHTML("afterend",'<div class="section-color blue">test</div>')
    }
}





