let text = document.querySelector("#text");
let inp = document.querySelector("#inp");
let win = document.querySelector("#win");
let lose = document.querySelector("#lose");
let start_btn = document.querySelector("#start_btn");

let excluded = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 36, 37, 38, 39, 40];
let textObj = [
    { text: "Hi Hello", time: 60, score: 5 },
    { text: "Hello, World", time: 60, score: 5 },
    { text: "Hmmmm test", time: 55, score: 10 },
    { text: "I eat cement", time: 55, score: 15 },
    { text: "I say the truth", time: 50, score: 15 },
    { text: "everything I say is a lie", time: 50, score: 20 },
    { text: "zobair soodi", time: 45, score: 25 },
    { text: "zobair soodi", time: 40, score: 30 }
];
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

document.body.addEventListener("keypress", (e) => {
    if (pause == true) {
        return;
    }
    if (excluded.includes(Number(e.keyCode))) {
        return;
    }
    var character = String.fromCharCode(e.keyCode);

    inp.value += character;
    var len = inp.value.length - 1;
    if (text.children[len] != undefined) {
        if (inp.value[len].charCodeAt(0) == 32 && text.innerText[len] == String.fromCharCode(160)) {
            text.children[len].style.backgroundColor = "green";
        }
        if (inp.value[len] == text.innerText[len]) {
            text.children[len].style.color = "green";
        }
        else {
            text.children[len].style.color = "red";
            error++;
            error_el.innerHTML = error;
            if (score > 0) {
                score--;
                score_el.innerHTML = score;
            }
        }
        if (inp.value == currentText) {
            score += textObj[currentPosition].score;
            score_el.innerHTML = score;

            currentPosition++;
            currentText = textObj[currentPosition].text;
            time = textObj[currentPosition].time;
            timer_el.innerHTML = time;
            fillText();
        }
    }
})

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

// Start button
start_btn.addEventListener("click", () => {
    if (pause == false) {
        pause = true;
        start_btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
    else {
        start_btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        pause = false;
    }
})

// TIMER
setInterval(resetTimer, 1000);

// Reset timer
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

        // inp.addEventListener("keyup", (e) => {
        //     if()
        //     if (excluded.includes(Number(e.keyCode))) {
        //         return;
        //     }
        //     else if(e.keyCode == 8){
        //         text.children[inp.value.length].style.color = "black";
        //     }
        //     else if (inp.value[inp.value.length - 1] == text.innerText[inp.value.length - 1]) {
        //         text.children[inp.value.length - 1].style.color = "green";

        //     }
        //     else {
        //         text.children[inp.value.length - 1].style.color = "red";
        //     }
        // })

        // inp.addEventListener("click", ()=>{
        //     var end = inp.value.length;
        //     var temp = document.createElement("input");
        //     document.body.appendChild(temp);
        //     temp.focus();
        //     inp.setSelectionRange(end, end);
        //     inp.focus();
        //     temp.remove();
        // })