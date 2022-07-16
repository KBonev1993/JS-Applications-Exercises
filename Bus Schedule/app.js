function solve() {
  let infoTable = document.querySelector("#info span");
  let departBtn = document.getElementById("depart");
  let arriveBtn = document.getElementById("arrive");

  let stop = {
    next: "depot",
  };

  async function depart() {
    departBtn.disabled = true;
    let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`
    let res = await fetch(url)
    if (res.status !== 200){
        infoTable.textContent = 'Error!'
        arriveBtn.disabled = true
        departBtn.disabled = true
        alert("Wrong data!")
    }
    stop = await res.json()
    infoTable.textContent = `Next stop ${stop.name}`
    arriveBtn.disabled = false
  }

  async function arrive() {
    departBtn.disabled = false
    let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`
    let res = await fetch(url)
    stop = await res.json()
    infoTable.textContent = `Arriving at ${stop.name}`
    arriveBtn.disabled = true
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
