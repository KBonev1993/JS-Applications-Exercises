function attachEvents() {
  let url = `http://localhost:3030/jsonstore/phonebook`;
  let ul = document.getElementById("phonebook");
  let person = document.getElementById("person");
  let phone = document.getElementById("phone");

  let btnLoad = document
    .getElementById("btnLoad")
    .addEventListener("click", onLoad);
  let btnCreate = document
    .getElementById("btnCreate")
    .addEventListener("click", onCreate);

  async function onLoad() {
    ul.innerHTML = "";
    let res = await fetch(url);
    let data = await res.json();
    Object.values(data).forEach((x) => {
      let { person, phone, _id } = x;

      let li = createElement("li", `${person}: ${phone}`, ul);
      li.setAttribute("id", _id);

      let btnDelete = createElement("button", "Delete", li);
      btnDelete.setAttribute("id", "btnDelete");
      btnDelete.addEventListener("click", onDelete);
    });
  }
  async function onDelete(ev) {
    let id = ev.target.parentNode.id;
    ev.target.parentNode.remove();
    let deleteUrl = `http://localhost:3030/jsonstore/phonebook/${id}`;
    await fetch(deleteUrl, {
      method: "DELETE",
    });
  }
  function createElement(type, text, appender) {
    let result = document.createElement(type);
    result.textContent = text;
    appender.appendChild(result);
    return result;
  }
  async function onCreate() {
    if (person.value !== "" || phone.value !== "") {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person: person.value, phone: phone.value }),
      });
      person.value = "";
      phone.value = "";
    }
  }
}

attachEvents();
