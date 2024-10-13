async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요.");
  const res = await fetch("/memos/${id}", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memo/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delbtn = document.createElement("button");
  delbtn.innerText = "삭제";
  delbtn.addEventListener("click", deleteMemo);
  delbtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delbtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerText = "";
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime().toString(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  // 자동 새로고침 방지
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  // submit 후 input 값 비우기
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
