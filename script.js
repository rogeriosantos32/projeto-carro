const carForm = document.getElementById("car-form");
const carList = document.getElementById("car-list");

let cars = JSON.parse(localStorage.getItem("cars")) || [];

function saveCars() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function displayCars() {
  carList.innerHTML = "";
  cars.forEach((car, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong><br>
      Placa: ${car.placa} | Ano: ${car.ano}
      <button class="remove" onclick="removeCar(${index})">Remover</button>
    `;
    carList.appendChild(li);
  });
}

function removeCar(index) {
  cars.splice(index, 1);
  saveCars();
  displayCars();
}

carForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const marca = document.getElementById("marca").value.trim();
  const modelo = document.getElementById("modelo").value.trim();
  const placa = document.getElementById("placa").value.trim().toUpperCase();
  const ano = parseInt(document.getElementById("ano").value);

  try {
    if (!marca || !modelo || !placa || !ano) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    if (cars.find(car => car.placa === placa)) {
      throw new Error("Carro com essa placa já está cadastrado.");
    }

    const car = { marca, modelo, placa, ano };
    cars.push(car);
    saveCars();
    displayCars();
    carForm.reset();
  } catch (error) {
    alert("❌ Erro: " + error.message);
  }
});

displayCars();
