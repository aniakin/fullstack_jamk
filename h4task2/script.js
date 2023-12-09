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
    housediv.appendChild(checkbox2);

    houses.forEach(house => {
        const showBySize = !checkbox1.checked || (checkbox1.checked && house.size < 200);
        const showByPrice = !checkbox2.checked || (checkbox2.checked && house.price < 1000000);

        if (showBySize && showByPrice) {
            let housecontainer = createHouseContainer(house);
            housediv.appendChild(housecontainer);
        }
    });
}

function createCheckbox(id, label) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.addEventListener('change', updateView); // Add event listener

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

    let header = createParagraph('header', house.address);
    let sizeText = createParagraph('text', 'Pinta-ala: ' + house.size + ' m²');
    let priceText = createParagraph('text', 'Hinta: ' + new Intl.NumberFormat('fi-FI').format(house.price) + ' €');

    housecontainer.appendChild(image);
    housecontainer.appendChild(header);
    housecontainer.appendChild(sizeText);
    housecontainer.appendChild(priceText);

    return housecontainer;
}

function createParagraph(className, text) {
    let paragraph = document.createElement('p');
    paragraph.className = className;
    paragraph.innerHTML = text;
    return paragraph;
}

function updateView() {
    renderHouses();
}

document.addEventListener('DOMContentLoaded', () => {
    renderHouses();
    updateView(); // Call updateView to ensure initial rendering reflects checkbox states
});
