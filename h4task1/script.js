// script.js

async function getHouses() {
    try {
        const response = await fetch('talotiedot.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Virhe talotietoja haettaessa:', error);
        return [];
    }
}

async function renderHouses() {
    let houses = await getHouses();

    let housediv = document.getElementById("houses");

    houses.forEach(house => {
        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = 'images/' + house.image; 
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let size = document.createElement('p');
        size.className = 'text';
        size.innerHTML = 'Koko: ' + house.size + ' m²';

        let text = document.createElement('p');
        text.className = 'text';
        text.innerHTML = house.text;

        let price = document.createElement('p');
        price.className = 'text';
        let numberStr = new Intl.NumberFormat('fi-FI').format(house.price);
        price.innerHTML = 'Hinta: ' + numberStr + ' €';

        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(size);
        housecontainer.appendChild(text);
        housecontainer.appendChild(price);

        housediv.appendChild(housecontainer);
    });
}

renderHouses();
