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

    let checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'filterSize';

    let label1 = document.createElement('label');
    label1.htmlFor = 'filterSize'; // Use htmlFor instead of for
    label1.innerHTML = 'Näytä alle 200m2';

    let checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filterPrice';

    let label2 = document.createElement('label');
    label2.htmlFor = 'filterPrice'; // Use htmlFor instead of for
    label2.innerHTML = 'Näytä alle 1 000 000 €';

    housediv.appendChild(checkbox1);
    housediv.appendChild(label1);
    housediv.appendChild(checkbox2);
    housediv.appendChild(label2);

    housediv.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            updateView();

    houses.forEach(house => {
        const showBySize = !checkbox1.checked || (checkbox1.checked && house.size < 200);
        const showByPrice = !checkbox2.checked || (checkbox2.checked && house.price < 1000000);

        if (showBySize && showByPrice) {
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

            let descriptionText = document.createElement('p');
            descriptionText.className = 'text';
            descriptionText.innerHTML = house.text;

            housecontainer.appendChild(image);
            housecontainer.appendChild(header);
            housecontainer.appendChild(sizeText);
            housecontainer.appendChild(priceText);
            housecontainer.appendChild(descriptionText);

            housediv.appendChild(housecontainer);
        }
    });
}

function updateView(event) {
    console.log('Checkbox clicked');
    console.log('Checkbox 1 checked:', checkbox1.checked);
    console.log('Checkbox 2 checked:', checkbox2.checked);

    event.preventDefault();
    renderHouses();
}

document.addEventListener('DOMContentLoaded', renderHouses);
