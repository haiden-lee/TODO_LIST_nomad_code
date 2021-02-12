const form=document.querySelector(".js-form"), input=form.querySelector("input"), greeting=document.querySelector(".js-greetings");

const USER_LS="currentUser", SHOWING_CN="showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); // 입력했을 때 default인 새로고침 event 실행을 막을 수 있도록
    const currentValue=input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit); 
};

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText=`For a meaningful day - ${text}`;
}

function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
};

init();