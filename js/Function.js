let LogInButton = document.getElementById("LogInButton");
let RememberMeChecker = document.getElementById("RememberMeChecker");
let PasswordInput = document.getElementById("PasswordInput");
let UsernameOrEmailInput = document.getElementById("UsernameOrEmailInput");

let invalidContent = document.querySelectorAll(".invalidcontent");
let usernameError = invalidContent[0];
let passwordError = invalidContent[1];

const username = "testuser";
const email = "test@example.com";
const password = "test123";

LogInButton.addEventListener("click" , function(){
    let usernameCorrect = false;
    let passwordCorrect = false;

    if(UsernameOrEmailInput.value === username || UsernameOrEmailInput.value === email){
        usernameCorrect = true;
        usernameError.classList.remove("activated");
    }else{
        usernameError.classList.add("activated");
    }

    if(PasswordInput.value === password){
        passwordCorrect = true;
        passwordError.classList.remove("activated");
    }else{
        passwordError.classList.add("activated");
    }

    if(usernameCorrect && passwordCorrect){
        window.location.href = "/pages/profile.html";
    }
})