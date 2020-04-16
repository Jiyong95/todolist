const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];
// todo들을 저장할 배열 생성.
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  // toDos배열에 아무것도 없을 경우 id를 1로 해주려고.
  // 즉, id를 0이 아닌 1부터 쓰려고.
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(delBtn);
  // li태그 안에 delBtn이 들어감.
  li.appendChild(span);
  // li태그 안에 span 태그가 들어감.
  toDoList.appendChild(li);
  //ul(=toDoList)에 li태그가 들어감.
  li.id = newId;
  // li에 id를 할당해줘서 todo(li)삭제시 해당 id를 가진 li삭제하려고.
  const toDoObj = {
    text: text,
    // key : value
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // JSON.stringify()는 toDos(object)를 string으로 바꿔줌.
  // localstorage는 string형태로 저장되기 때문에
  // {text,id}를 가진 toDos를 string으로 바꿔준다.
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    // string인 loadedToDos를 object로 변환.
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
    // forEach()는 배열의 원소 각각에 대해 해당 함수를 실행시켜줌.
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
