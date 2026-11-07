import { registerUser } from "./auth.js";

const SignupForm = document.getElementById("SignupForm");
const UsernameInput = document.getElementById("SignupUsernameInput");
const EmailInput = document.getElementById("SignupEmailInput");
const PasswordInput = document.getElementById("SignupPasswordInput");
const ConfirmInput = document.getElementById("SignupConfirmInput");
const TermsChecker = document.getElementById("TermsChecker");
const TermsLabel = document.querySelector("label[for='TermsChecker']");

const UsernameError = document.getElementById("UsernameError");
const EmailError = document.getElementById("EmailError");
const PasswordError = document.getElementById("PasswordError");
const ConfirmError = document.getElementById("ConfirmError");

function showError(errorElement , message){
    errorElement.textContent = message;
    errorElement.classList.add("activated");
}

function hideError(errorElement){
    errorElement.classList.remove("activated");
}

SignupForm.addEventListener("submit" , async function(event){
    event.preventDefault();

    let allCorrect = true;
    const username = UsernameInput.value.trim();
    const email = EmailInput.value.trim();
    const password = PasswordInput.value;

    if(/^[A-Za-z0-9_]{3,20}$/.test(username)){
        hideError(UsernameError);
    }else{
        showError(UsernameError , "Use 3-20 letters, numbers or _");
        allCorrect = false;
    }

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        hideError(EmailError);
    }else{
        showError(EmailError , "Enter a valid email");
        allCorrect = false;
    }

    if(password.length >= 6){
        hideError(PasswordError);
    }else{
        showError(PasswordError , "At least 6 characters");
        allCorrect = false;
    }

    if(ConfirmInput.value === password && password !== ""){
        hideError(ConfirmError);
    }else{
        showError(ConfirmError , "Passwords do not match");
        allCorrect = false;
    }

    if(TermsChecker.checked){
        TermsLabel.classList.remove("activated");
    }else{
        TermsLabel.classList.add("activated");
        allCorrect = false;
    }

    if(allCorrect === false){
        return;
    }

    const { success, usernameTaken, emailTaken } = await registerUser({ username, email, password });

    if(success){
        window.location.href = "Index.html";
    }else if(usernameTaken || emailTaken){
        if(usernameTaken){
            showError(UsernameError , "Username is already taken");
        }
        if(emailTaken){
            showError(EmailError , "Email is already registered");
        }
    }else{
        showError(UsernameError , "Could not save your data");
    }
})