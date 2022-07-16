let url = `http://localhost:3030/jsonstore/messenger`;
let textArea = document.getElementById("messages");

function attachEvents() {
  let refreshBtn = document
    .getElementById("refresh")
    .addEventListener("click", refreshClick);
  let submitBtn = document
    .getElementById("submit")
    .addEventListener("click", submitClick);
}
async function submitClick() {
  let author = document.getElementById("author");
  let content = document.getElementById("content");
  if (author.value !== "" || content.value !== "") {
    await request(url, {
      author: author.value,
      content: content.value,
    });
    author.value = "";
    content.value = "";
  }
}
async function refreshClick() {
  let res = await fetch(url);
  let data = await res.json();

  textArea.value = Object.values(data)
    .map(({ author, content }) => `${author}: ${content}`)
    .join("\n");
}

async function request(url, option) {
  if (option) {
    option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    };
  }
  let response = await fetch(url, option);
  return response.json();
}

attachEvents();
