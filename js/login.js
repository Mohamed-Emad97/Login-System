//Global Variables
const btnLogin = document.querySelector("#btn-login");
const loginEmail = document.querySelector("#mail-login");
const loginPassword = document.querySelector("#password-login");
const loginInputs = document.querySelectorAll("#form-login input");
const loginAlert = document.querySelector("#login-alert");
const loginSuccessAlert = document.querySelector("#login-success-alert");
const mailWarring = document.querySelector("#mail-warring");
const passWarring = document.querySelector("#pass-warring");
const home = document.querySelector("#home");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //8 chars at least 1 char & 1 num

let users = [];

//getUsersFromLocalStorage
if(JSON.parse(localStorage.getItem("user")) != null) {
    users = JSON.parse(localStorage.getItem("user"));
}

//Program Events
btnLogin.addEventListener("click", function(e){
    if(loginIsEmpty()){
        e.preventDefault();
        loginAlert.classList.add('d-block');
        loginAlert.classList.remove('d-none');
        loginSuccessAlert.classList.remove("d-block");
        loginSuccessAlert.classList.add("d-none");
    } else {
        e.preventDefault();
        loginAlert.classList.remove('d-block');
        loginAlert.classList.add('d-none');
        for(let i =0; i < users.length; i++) {
            if(users[i].email.toLowerCase() == loginEmail.value.toLowerCase() && users[i].password == loginPassword.value) {
                loginSuccessAlert.classList.add("d-block");
                loginSuccessAlert.classList.remove("d-none");
                resetLoginInputs();
                home.innerHTML = `Welcome ${users[i].name} In Home Page`;
            }
        }
    }
})
loginEmail.addEventListener("keyup", function(){
    let emailTxt = loginEmail.value;
    if(emailRegex.test(emailTxt)) {
        console.log("true");
        mailWarring.classList.remove("d-block");
        mailWarring.classList.add("d-none");
    } else {
        console.log("false");
        mailWarring.classList.add("d-block");
        mailWarring.classList.remove("d-none");
    }
})

loginPassword.addEventListener("keyup", function(){
    let passTxt = loginPassword.value;
    if(passRegex.test(passTxt)){
        passWarring.classList.remove("d-block");
        passWarring.classList.add("d-none");
    }else {
        passWarring.classList.add("d-block");
        passWarring.classList.remove("d-none");
    }
})
//Program Functions
function loginIsEmpty(){
    if(loginEmail.value == "" && loginPassword.value == "") {
        return true;
    }else {
        return false;
    }
}

function resetLoginInputs() {
    for(let i = 0; i < loginInputs.length; i++) {
        loginInputs[i].value = ``;
    }
}