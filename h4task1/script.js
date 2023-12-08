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
    checkbox1.addEventListener('change', updateView);
    
    let label1 = document.createElement('label');
    label1.for = 'filterSize';
    label1.innerHTML = 'Näytä alle 200m2';

    let checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filterPrice';
    checkbox2.addEventListener('change', updateView);
    
    let label2 = document.createElement('label');
    label2.for = 'filterPrice';
    label2.innerHTML = 'Näytä alle 1 000 000 €';

    housediv.appendChild(checkbox1);
    housediv.appendChild(label1);
    housediv.appendChild(checkbox2);
    housediv.appendChild(label2);

    houses.forEach(house => {
        const showBySize = !checkbox1.checked || (checkbox1.checked && house.size < 200);
        const showByPrice = !checkbox2.checked || (checkbox2.checked && house.price < 1000000);

        if (showBySize && showByPrice) {
            housecontainer = document.createElement('div');
            housecontainer.className = 'houseContainer';
  
            let image = document.createElement('img');
            image.src = 'images/' + house.image;
            image.className = 'houseImage';
  
            let header = document.createElement('p');
            header.className = 'header';
            header.innerHTML = house.address;
  
            let size = document.createElement('p');
            size.innerHTML = 'Size: ' + house.size + ' sqm';
  
            let price = document.createElement('p');
            price.innerHTML = 'Price: ' + new Intl.NumberFormat('fi-FI').format(house.price);
  
            let text = document.createElement('p');
            text.className = 'text';
            text.innerHTML = house.text;
  
      housecontainer.appendChild(image);
      housecontainer.appendChild(header);
      housecontainer.appendChild(size);
      housecontainer.appendChild(price);
      housecontainer.appendChild(text);
  
      housediv.appendChild(housecontainer);
    });
  }
  
  renderHouses();  