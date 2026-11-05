import { loginUser } from "./auth.js";
import { setCurrentUser } from "./userStorage.js";

const LoginForm = document.getElementById("LoginForm");
const UsernameOrEmailInput = document.getElementById("UsernameOrEmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const RememberMeChecker = document.getElementById("RememberMeChecker");
const UsernameError = document.getElementById("UsernameError");
const PasswordError = document.getElementById("PasswordError");

LoginForm.addEventListener("submit" , async function(event){
    event.preventDefault();

    const { usernameCorrect, passwordCorrect, user } = await loginUser(UsernameOrEmailInput.value, PasswordInput.value);

    if(usernameCorrect){
        UsernameError.classList.remove("activated");
        if(passwordCorrect){
            PasswordError.classList.remove("activated");
            setCurrentUser(user.username, RememberMeChecker.checked);
            window.location.href = "profile.html";
        }else{
            PasswordError.classList.add("activated");
        }
    }else{
        UsernameError.classList.add("activated");
        PasswordError.classList.remove("activated");
    }
})