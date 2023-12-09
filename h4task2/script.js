let checkbox1, checkbox2; // Declare checkboxes globally

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

            housecontainer.appendChild(image);
            housecontainer.appendChild(header);
            housecontainer.appendChild(sizeText);
            housecontainer.appendChild(priceText);

            housediv.appendChild(housecontainer);
        }
    });
}

function updateView() {
    renderHouses();
}

document.addEventListener('DOMContentLoaded', () => {
    housediv = document.getElementById("houses");
    checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'filterSize';

    checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filterPrice';

    housediv.appendChild(checkbox1);
    housediv.appendChild(document.createTextNode('Näytä alle 200m2'));
    housediv.appendChild(checkbox2);
    housediv.appendChild(document.createTextNode('Näytä alle 1 000 000 €'));

    renderHouses();

    housediv.addEventListener('change', () => {
        updateView();
    });
});
