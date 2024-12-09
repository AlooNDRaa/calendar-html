const sessionNameInput = document.getElementById('sessionName');
const saveSessionBtn = document.getElementById('saveSession');
const deleteSessionBtn = document.getElementById('deleteSession')
const sessionOutput = document.getElementById('sessionOutput');

saveSessionBtn.addEventListener('click', () => {
    const name = sessionNameInput.value.trim();

    if (name === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    sessionStorage.setItem('name', name);
    alert(`Nombre guardado en sessionStorage: ${name}`);
    console.log("Nombre guardado en sessionStorage:", name);

    displaySessionStorage(); 

});

deleteSessionBtn.addEventListener('click', () =>{
    sessionStorage.removeItem('name');
    alert("Nombre eliminado del session")
    displaySessionStorage();
})

function displaySessionStorage() {
    const savedName = sessionStorage.getItem('name');
    sessionOutput.textContent = savedName || "Sin datos aún."; 
}

document.addEventListener('DOMContentLoaded', displaySessionStorage);


function createItem() {
    localStorage.mytime = Date.now();
    alert("Local agregado")
  }
  
  function deleteItem() {
    localStorage.removeItem("mytime");
    alert("Local eliminado")
  }
  
  function displayItem() {
    var x = localStorage.getItem('mytime');
    if (x) {
      let readableDate = new Date(parseInt(x)).toLocaleString(); //lo uso para convertir en fecha legible
      document.getElementById('demo').innerHTML = readableDate;
    } else {
      document.getElementById('demo').innerHTML = "Sin datos agregados en tu local";
    }
  }