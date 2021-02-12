const toDoForm=document.querySelector(".js-toDoForm"), toDoInput=toDoForm.querySelector("input"), toDoList=document.querySelector(".js-toDoList");

const TODOS_LS='toDos';

let toDos=[];

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id!==parseInt(li.id);//li.id는 string이므로 int로 변환
    });
    toDos=cleanToDos;
    saveToDos();
};//어느 버튼을 클릭했는지 확인할 수 있도록 .target

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const span=document.createElement("span");
    const newId=toDos.length+1;
    delBtn.innerText="✔";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText=text;
    li.appendChild(delBtn); //li에 하ㅜ이요소로 추가
    li.appendChild(span);
    li.id=newId; //각각의 todo 목록을 구분해 삭제할 수 있도록 id 부여
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos(); //push하기 전에 호출하면 저장할 게 X
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function something(toDo){
    console.log(toDo.text);
};

function loadToDos(){
    const loadedtoDos=localStorage.getItem(TODOS_LS);
    if(loadedtoDos!==null){
        const parsedToDos=JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();