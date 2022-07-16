async function getInfo() {
  let textInput = document.getElementById("stopId").value;
  let checkBtn = document.getElementById("submit");

  let url = `http://localhost:3030/jsonstore/bus/businfo/${textInput}`;

  let stopNameElement = document.getElementById("stopName");
  let buses = document.getElementById("buses");

  try {
    stopNameElement.textContent = "Loading..."
    buses.replaceChildren()
    let res = await fetch(url);
    if(res.status !== 200){
        throw new Error('Stop ID not found')
    }
    let data = await res.json();

    stopNameElement.textContent = data.name
    Object.entries(data.buses).forEach(b => {
        let liElement = document.createElement('li')
        liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`
        buses.appendChild(liElement)
    })
    


  } catch (error) {
    stopNameElement.textContent = "Error"
  }
}
