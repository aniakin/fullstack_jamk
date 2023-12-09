let checkboxState = {
    filterSize: false,
    filterPrice: false,
};

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
        let housecontainer = createHouseContainer(house);
        housediv.appendChild(housecontainer);
    });

    // Add event listener to housediv for checkbox changes
    housediv.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            checkboxState[event.target.id] = event.target.checked;
            updateView();
        }
    });
}

function createCheckbox(id, label) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = checkboxState[id]; // Set the initial state

    let labelElement = document.createElement('label');
    lab
