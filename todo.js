const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
// todo들을 저장할 배열 생성.

function deleteToDo(event) {
  const btn = event.target;
  // target은 클릭한 요소<button>❌</button>를 dom으로 반환.
  const li = btn.parentNode;
  // btn의 부모 노드
  toDoList.removeChild(li);
  // 여기까지가 HTML상에서만 TODO를 지움.
  // local storage에는 남아있음.
  // 즉, li만 지워짐.
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
    // toDo.id는 int, li.id는 string임.
    /* 위에서 li가 지워져 toDo.id는 있지만 li.id는 사라진상태.
     따라서, 위 조건을 통해 toDo.id에서 지워야할 id를 찾음.*/
    /* filter()는 toDos각각의 원소들에 대해 해당 함수가 실행되고,
      해당 함수를 만족하는 원소들로만 새로운 배열을 생성.*/
  });
  toDos = cleanToDos;
  // toDos가 const면 값을 변경 불가.
  // 따라서 let으로 변경.
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  // toDos배열에 아무것도 없을 경우 id를 1로 해주려고.
  // 즉, id를 0이 아닌 1부터 쓰려고.
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
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
