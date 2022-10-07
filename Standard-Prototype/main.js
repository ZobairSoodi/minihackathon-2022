let text = document.querySelector("#text");
let inp = document.querySelector("#inp");
let win = document.querySelector("#win");
let lose = document.querySelector("#lose");
let start_btn = document.querySelector("#start_btn");

let excluded = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 36, 37, 38, 39, 40];
let textObj = [
    { text: "Hello", time: 60, score: 5 },
    { text: "Hello, World", time: 60, score: 5 },
    { text: "dlroW ,olleH", time: 55, score: 10 },
    { text: "I ate an apple", time: 55, score: 15 },
    { text: "I say the truth", time: 50, score: 15 },
    { text: "everything I say is a lie", time: 50, score: 20 },
    { text: "Nothing thats worth anything is easy", time: 45, score: 25 },
    { text: "You never fail until you stop trying", time: 40, score: 30 },
    { text: "Pain is temporary. Quitting lasts forever", time: 35, score: 35 },
    { text: "The secret of getting ahead is getting started", time: 30, score: 40 } 
];

// Set the time for each text object
// depending on the difficulty chosen
textObj.forEach(el => {
    if (difficulty == "normal") {
        el.time = Math.floor(el.time * 0.5);
    }
    else if (difficulty == "hard") {
        el.time = Math.floor(el.time * 0.25);
    }
});

let currentPosition = 0;
let currentText = textObj[currentPosition].text;

let score_el = document.querySelector("#score");
let score = 0;

let error_el = document.querySelector("#error");
let error = 0;

let timer_el = document.querySelector("#timer");
let time = textObj[currentPosition].time;
timer_el.innerHTML = time;

let pause = true;

let won = false;
let level = 1;

// fill the text area with the current text object
function fillText() {
    text.innerText = "";
    inp.value = "";
    for (let i = 0; i < currentText.length; i++) {
        var letter = document.createElement("span");
        if (currentText[i] === " ") {
            letter.innerHTML = "&nbsp;";
            text.appendChild(letter);
            continue;
        }
        letter.innerHTML = currentText[i];
        text.appendChild(letter);
    }
}
fillText();

// key detection and processing
document.body.addEventListener("keypress", (e) => {
    if (pause == true) {
        return;
    }
    // if (excluded.includes(Number(e.keyCode))) {
    //     return;
    // }

    // convert the detected keyCode into the corresponding character
    var character = String.fromCharCode(e.keyCode);

    inp.value += character;
    var index = inp.value.length - 1;
    if (text.children[index] != undefined) {

        // turn bg color green if the player gets a space character right
        if (inp.value[index].charCodeAt(0) == 32 && text.innerText[index] == String.fromCharCode(160)) {
            text.children[index].style.backgroundColor = "green";
        }
        // turn bg color red if the player gets a space character wrong
        else if (inp.value[index].charCodeAt(0) != 32 && text.innerText[index] == String.fromCharCode(160)) {
            text.children[index].style.backgroundColor = "red";
        }
        // turn color green if the player gets any other character right
        else if (inp.value[index] == text.innerText[index]) {
            text.children[index].style.color = "green";
        }
        // turn color red if the player gets any other character wrong
        else {
            text.children[index].style.color = "red";
            error++;
            error_el.innerHTML = error;
            if (score > 0) {
                score--;
                score_el.innerHTML = score;
            }
        }

        // go to next level/word if the player has typed the current word correctly
        if (inp.value == currentText) {
            score += textObj[currentPosition].score;
            score_el.innerHTML = score;

            // show the win interface if the player finishes the game/ completes all the words
            if (level == textObj.length) {
                console.log("won");
                pause = true;
                win.style.zIndex = 10;
                win.style.opacity = 1;
                document.querySelector("#score_end").innerHTML = score;
                document.querySelector("#error_end").innerHTML = error;

                return;
            }
            level++;
            currentPosition++;
            currentText = textObj[currentPosition].text;
            time = textObj[currentPosition].time;
            timer_el.innerHTML = time;
            fillText();
        }
    }
})

// handle the backspace key event. in other words, if the player 
// presses "backspace" it will remove the last character from the input
document.addEventListener("keyup", (e) => {
    if (e.keyCode == 8) {
        if (text.children[inp.value.length - 1] != undefined) {
            text.children[inp.value.length - 1].style.color = "black";
            text.children[inp.value.length - 1].style.backgroundColor = "antiquewhite";
        }
        else if (text.children[inp.value.length - 1] != undefined && inp.value[inp.value.length - 1].charCodeAt(0) == 32) {
            inp.value[inp.value.length - 1] = String.fromCharCode(160);
            text.children[inp.value.length - 1].style.backgroundColor = "antiquewhite";
        }
        inp.value = inp.value.slice(0, -1);
        return;
    }
})

// Start the game when the button is pressed
start_btn.addEventListener("click", () => {
    if (pause == false) {
        pause = true;
        start_btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
    else {
        start_btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        pause = false;
    }
    var temp_btn = document.createElement("button");
    document.body.appendChild(temp_btn);
    temp_btn.focus();
    temp_btn.remove();
})

// execute the timer function every second
setInterval(resetTimer, 1000);

// Reset timer function
function resetTimer() {
    if (pause) {
        return;
    }
    time--;
    timer_el.innerHTML = time;
    if (time == 0) {
        lose.style.zIndex = 10;
        lose.style.opacity = 1;
    }
}

// Reset the game
function resetGame() {
    level = 1;
    // reset text
    currentPosition = 0;
    currentText = textObj[currentPosition].text;
    fillText();

    // reset timer
    time = textObj[currentPosition].time;
    timer_el.innerHTML = time;

    // reset score
    score = 0;
    score_el.innerHTML = 0;

    // hide win and lose
    win.style.zIndex = -10;
    win.style.opacity = 0;
    lose.style.zIndex = -10;
    lose.style.opacity = 0;

    // pause the game
    pause = true;
    start_btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}
