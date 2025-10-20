// Implémenter le JS de ma page d'inscription

const inputName = document.getElementById("NameInput");
const inputFirstName = document.getElementById("FirstNameInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputConfirmPassword = document.getElementById("ConfirmPasswordInput");
const btnValidateSignup = document.getElementById("btn-validate-signup");

inputName.addEventListener("keyup", validateForm);
inputFirstName.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputConfirmPassword.addEventListener("keyup", validateForm);

function validateForm(){
    const nameValid = validateRequired(inputName);
    const firstNameValid = validateRequired(inputFirstName);
    const emailValid = validateEmail(inputEmail);
    const passwordValid = validatePassword(inputPassword);
    const confirmPasswordValid = validateConfirmPassword(inputPassword, inputConfirmPassword);

    if(nameValid && firstNameValid && emailValid && passwordValid && confirmPasswordValid){
        btnValidateSignup.disabled = false;
    } 
    else {
        btnValidateSignup.disabled = true;
    }
}

function validatePassword(input){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

function validateConfirmPassword(passwordInput, confirmInput){
    if(confirmInput.value === passwordInput.value && confirmInput.value !== ""){
        confirmInput.classList.add("is-valid");
        confirmInput.classList.remove("is-invalid");
        return true;
    } 
    else {
        confirmInput.classList.add("is-invalid");
        confirmInput.classList.remove("is-valid");
        return false;
    }
}

function validateEmail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value.trim();
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

function validateRequired(input){
    if(input.value != ""){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}
