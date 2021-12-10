const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME="hidden"; //string은 대문자로 표기하는게 관습
const USERNAME_KEY="username";

function onLoginSubmit(event){
    event.preventDefault(); //submit 창이동 기능 지움
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username=loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);

}

function paintGreetings(username){
    greeting.innerHTML=`Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}


const savedUsername=localStorage.getItem(USERNAME_KEY);

if(savedUsername===null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}else{
    paintGreetings(savedUsername);
}