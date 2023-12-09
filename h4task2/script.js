async function getHouses() {
    const response = await fetch('talotiedot.json');
    const data = await response.json();
    return data;
}

function createCheckbox(id, labelText, onChange) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.addEventListener('change', onChange);

    let label = document.createElement('label');
    label.for = id;
    label.innerHTML = labelText;
    label.appendChild(checkbox);

    return { checkbox, label };
}

async function renderHouses() {
    let houses = await getHouses();
    console.log(houses);

    let housediv = document.getElementById("houses");
    housediv.innerHTML = "";

    let { checkbox: checkbox1, label: label1 } = createCheckbox('filterSize', 'Näytä alle 200m2', updateView);
    let { checkbox: checkbox2, label: label2 } = createCheckbox('filterPrice', 'Näytä alle 1 000 000 €', updateView);

    housediv.appendChild(label1);
    housediv.appendChild(label2);

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

document.addEventListener('DOMContentLoaded', renderHouses);
