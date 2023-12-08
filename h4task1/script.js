async function getHouses() {
    const response = await fetch('talotiedot.json');
    const data = await response.json();
    return data;
  }
  
  async function renderHouses() {
    let houses = await getHouses();
    console.log(houses);
  
    let housediv = document.getElementById("houses");
  
    houses.forEach(house => {
      let housecontainer = document.createElement('div');
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
  