let textTest = document.getElementById("testText");

let inputTest = document.getElementById("inputTest")

let time = document.getElementById("time")


let text = "start";



function showText(){

    for(let i=0; i < text.length; i++){

        let letters = document.createElement("span")
        if(text[i]=== " "){
            letters.innerHTML ="&nbsp"
            textTest.appendChild(letters)
            continue;
        }
        letters.innerHTML = text[i]
        textTest.appendChild(letters);
    }
}

showText();
        let mainLevel = document.getElementById("mainLevel");

inputTest.addEventListener("keyup", ()=>{
      if(inputTest.value === text){
        window.scrollBy(0, 430);
        mainLevel.style.display = "block";
    }
})

  


