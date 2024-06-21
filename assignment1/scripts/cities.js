const image = document.querySelector("img");
const allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
    const id = button.id;
    if (id == "smallButton") {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            image.removeAttribute('class');
            image.classList.add("smallButton");
        });
    } else if (id == "mediumButton") {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            image.removeAttribute('class');
            image.classList.add("mediumButton");
        });
    } else if (id == "largeButton") {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            image.removeAttribute('class');
            image.classList.add("largeButton");
        });
    } 
})
