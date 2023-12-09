async function getHouses() {
    const response = await fetch('talotiedot.json');
    const data = await response.json();
    return data;
}

async function renderHouses() {
    let houses = await getHouses();
    console.log(houses);

    let housediv = document.getElementById("houses");
    housediv.innerHTML = "";

    let checkbox1 = createCheckbox('filterSize', 'Näytä alle 200m2');
    let checkbox2 = createCheckbox('filterPrice', 'Näytä alle 1 000 000 €');

    housediv.appendChild(checkbox1);
    housediv.appendChild(document.createElement('br'));
    housediv.appendChild(checkbox2);

    houses.forEach(house => {
        const showBySize = !checkbox1.checked || (checkbox1.checked && house.size < 200);
        const showByPrice = !checkbox2.checked || (checkbox2.checked && house.price < 1000000);

        if (showBySize && showByPrice) {
            let housecontainer = createHouseContainer(house);
            housediv.appendChild(housecontainer);
        }
    });

    // Add event listeners after rendering
    checkbox1.addEventListener('change', updateView);
    checkbox2.addEventListener('change', updateView);
}

function createCheckbox(id, label) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;

    let labelElement = document.createElement('label');
    labelElement.for = id;
    labelElement.innerHTML = label;
    labelElement.appendChild(checkbox);

    return labelElement;
}

function createHouseContainer(house) {
    let housecontainer = document.createElement('div');
    housecontainer.className = 'houseContainer';

    let image = document.createElement('img');
    image.src = 'images/' + house.image;
    image.className = 'houseImage';

    let header = document.createElement('p');
    header.className = 'header';
    header.innerHTML = house.address;

    let sizeText = document.createElement('p');
    sizeText.className = 'text';
    sizeText.innerHTML = 'Pinta-ala: ' + house.size + ' m²';

    let priceText = document.createElement('p');
    priceText.className = 'text';
    priceText.innerHTML = 'Hinta: ' + new Intl.NumberFormat('fi-FI').format(house.price) + ' €';

    housecontainer.appendChild(image);
    housecontainer.appendChild(header);
    housecontainer.appendChild(sizeText);
    housecontainer.appendChild(priceText);

    return housecontainer;
}

function updateView() {
    renderHouses();
}

document.addEventListener('DOMContentLoaded', renderHouses);
