const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //json 문자열로 바꿔 스토리지 저장
  //왜 array.prototype.join을 안 쓰고 json.stringify를 썼는가?
  //->나중에 json.parse로 쉽게 다시 배열화하기 위해.
}


function deleteToDo(event) {
    const li = event.target.parentElement; //target을 이렇게도 사용할수 있구만
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    //filter는 true return하는 요소만 남겨서 새 array만듦

    saveToDos();
  }
  

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  li.appendChild(span);

  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(button);

  li.id=newTodo.id;

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(), //밀리초, number
  };


  paintToDo(newTodoObj);

  toDos.push(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos=parsedToDos;
  parsedToDos.forEach(paintToDo);
}