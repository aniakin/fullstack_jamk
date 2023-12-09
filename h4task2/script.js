document.addEventListener('DOMContentLoaded', function () {
    renderHouses();

    document.getElementById('filterSize').addEventListener('change', updateView);
    document.getElementById('filterPrice').addEventListener('change', updateView);
});

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

    housediv.appendChild(checkbox1.checkbox);
    housediv.appendChild(checkbox1.label);
    housediv.appendChild(checkbox2.checkbox);
    housediv.appendChild(checkbox2.label);

    houses.forEach(house => {
        const showBySize = !checkbox1.checkbox.checked || (checkbox1.checkbox.checked && house.size < 200);
        const showByPrice = !checkbox2.checkbox.checked || (checkbox2.checkbox.checked && house.price < 1000000);

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

    function createCheckbox(id, label) {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;

        let labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.innerHTML = label;

        checkbox.addEventListener('change', updateView);

        return { checkbox, label: labelElement };
    }
}

function updateView() {
    renderHouses();
}