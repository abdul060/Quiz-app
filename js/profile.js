let notificationButton = document.querySelector("#buttonBackground span");
let notificationButton2 = document.querySelector("#buttonBackground2 span");


let buttonBackground = document.getElementById("buttonBackground");
let buttonBackground2 = document.getElementById("buttonBackground2");

let clickedCount = 0;
buttonBackground.addEventListener("click" , function(){
    clickedCount++
    if(clickedCount % 2 === 0){
        buttonBackground.setAttribute("aria-checked" , "true");
        buttonBackground.classList.remove("activated");
        notificationButton.classList.remove("disabled");
        notificationButton.classList.add("activated");
    }else{
        buttonBackground.setAttribute("aria-checked" , "false");
        buttonBackground.classList.add("activated");
        notificationButton.classList.add("disabled");
        notificationButton.classList.remove("activated");
    }
    
})
let clickedCount2 = 0;
buttonBackground2.addEventListener("click" , function(){
    clickedCount2++
    if(clickedCount2 % 2 === 0){
        buttonBackground2.setAttribute("aria-checked" , "true");
        buttonBackground2.classList.remove("activated");
        notificationButton2.classList.remove("disabled");
        notificationButton2.classList.add("activated");
    }else{
        buttonBackground2.setAttribute("aria-checked" , "false");
        buttonBackground2.classList.add("activated");
        notificationButton2.classList.add("disabled");
        notificationButton2.classList.remove("activated");
    }
    
})