//Global Varibles
const btnSign = document.querySelector("#btn-sign");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const passwordInput = document.querySelector("#password"); 
const signInputs = document.querySelectorAll("#form-sign input");
const signAlert = document.querySelector("#sign-alert");
const sucessAlert = document.querySelector("#success-alert");
const home = document.querySelector("#home");
const nameWarring = document.querySelector("#name-warring");
const mailWarring = document.querySelector("#mail-warring");
const mailExistAlert = document.querySelector("#mail-exist");
const passWarring = document.querySelector("#pass-warring");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[A-Z][-a-zA-Z]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //8 chars at least 1 char & 1 num

let users = []; 

//getUsersFromLocalStorage
if(JSON.parse(localStorage.getItem("user")) != null) {
    users = JSON.parse(localStorage.getItem("user"));
}

//Events
btnSign.addEventListener("click", function(e){
    if(signInIsEmpty()) {
        e.preventDefault();
        signAlert.classList.add('d-block');
        signAlert.classList.remove('d-none');
        sucessAlert.classList.remove("d-block");
        sucessAlert.classList.add("d-none");
    } else {
        e.preventDefault();
        signAlert.classList.remove('d-block');
        signAlert.classList.add('d-none');
        addUser();
        sucessAlert.classList.add("d-block");
        sucessAlert.classList.remove("d-none");
        resetSignInputs();
    }
});

nameInput.addEventListener("keyup", function(){
    let nameTxt = nameInput.value;
    if(nameRegex.test(nameTxt)) {
        nameWarring.classList.remove("d-block");
        nameWarring.classList.add("d-none");
    } else {
        nameWarring.classList.add("d-block");
        nameWarring.classList.remove("d-none");
    }
})

emailInput.addEventListener("keyup", function(){
    let emailTxt = emailInput.value;
    if(emailRegex.test(emailTxt)) {
        mailWarring.classList.remove("d-block");
        mailWarring.classList.add("d-none");
    } else {
        mailWarring.classList.add("d-block");
        mailWarring.classList.remove("d-none");
    }
    for(let i=0; i<users.length; i++){
        if(emailInput.value.toLowerCase() == users[i].email.toLowerCase()){
            mailExistAlert.classList.add("d-block");
            mailExistAlert.classList.remove("d-none");
        }else {
            mailExistAlert.classList.add("d-none");
            mailExistAlert.classList.remove("d-block");
        }
    }
})

passwordInput.addEventListener("keyup", function(){
    let passTxt = passwordInput.value;
    if(passRegex.test(passTxt)){
        passWarring.classList.remove("d-block");
        passWarring.classList.add("d-none");
    }else {
        passWarring.classList.add("d-block");
        passWarring.classList.remove("d-none");
    }
})
//Program Functions
function addUser (){
    let user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    } 
    users.push(user);
    localStorage.setItem("user",JSON.stringify(users));
}
function signInIsEmpty(){
    if(nameInput.value == "" && emailInput.value == "" && passwordInput.value == "") {
        console.log("true");
        return true;
    }else {
        console.log("flase");
        return false;
    }
}
function resetSignInputs() {
    for(let i = 0; i < signInputs.length; i++) {
        signInputs[i].value = ``;
    }
}    