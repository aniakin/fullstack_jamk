function changeImage(imageName) {
    const mainImage = document.getElementById('main-image');
  
    if (mainImage) {
      mainImage.src = `images/${imageName}`;
      mainImage.alt = `Kuva ${imageName.charAt(imageName.length - 5)}`; // Olettaen, että tiedoston nimi on muotoa "kuvaX.jpg"
    } else {
      console.error('Element with ID "main-image" not found.');
    }
  }
  