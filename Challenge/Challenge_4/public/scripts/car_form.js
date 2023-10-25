function getValue(selectObject) {
    var value = selectObject.value;
    return value;
}

// const data = require('../../data/cars.json');

async function filter() {
    let carContainerElement = document.getElementById("cars-container");
    carContainerElement.innerHTML = '';

    let type = getValue(document.getElementById("input-type"));
    let date = getValue(document.getElementById("input-date"));
    let dateTime = new Date(date);
    let time = getValue(document.getElementById("input-time"));
    let amount = getValue(document.getElementById("input-amount"));

    console.log(type, date, time, amount);

    let cars = await CarHelper.listCars((car) => {
        let carDate = new Date(car.availableAt);
        let isDateTime = carDate < dateTime;
        let isType = true;
        let isAmount = parseInt(car.capacity) < parseInt(amount);
        let result = (isDateTime || isAmount || isType) && car.available;
        return result;
    })

    console.log(cars);

    cars.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = `
        <div class="col p-2 mb-5">
            <img src="${car.image}" class="w-auto img-thumbnail object-fit-cover center" style="height:200px;" alt="${car.manufacture}">
            <div>
                <p class="fs-6 fw-medium">Nama/Tipe Mobil</p>
            </div>
            <div class="fs-4 fw-bold">
                ${car.rentPerDay} / hari
            </div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut laboret et
                dolore aliqua
            </div>
            <div>
                <i class="fa-solid fa-user p-2"></i>${car.capacity}
            </div>
            <div>
                <i class="fa-solid fa-gear p-2"></i>${car.transmission}
            </div>
            <div>
                <i class="fa-solid fa-calendar p-2"></i>${car.year}
            </div>
        </div>
        `;
        carContainerElement.appendChild(node);
    });
}

