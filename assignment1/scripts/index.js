const mainForm = document.querySelector("form");
const historyList = document.querySelector(".historyList");

mainForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const userInput = e.currentTarget.dcolor.value;

    if (isValidHex(userInput)) {
        const modifiedInput = "#" + userInput.toUpperCase()

        // add it to history list 
        const inputToName = ntc.name(modifiedInput)[1]
        historyList.innerHTML += "<li>" 
            + '<span style="background-color:' + modifiedInput + ';"> &nbsp;&nbsp;&nbsp; </span>'
            + "&nbsp;" + inputToName + " (" + modifiedInput + ") at " 
            + "<em>" + new Date().toLocaleString() + "</em>"
            + "</li>"

        // change color of menu
        document.getElementById("menu").style.backgroundColor = modifiedInput;
        document.getElementById("submitButton").style.backgroundColor = modifiedInput;

        e.target.reset()
    } else {
        alert(userInput + " is not a valid hex code!")
    }
    
}

function isValidHex(userInput) {
    return typeof userInput === 'string'
      && userInput.length === 6
      && !isNaN(Number('0x' + userInput))
}



