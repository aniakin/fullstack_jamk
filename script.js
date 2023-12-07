function changeImage(imageName) {
    const mainImage = document.getElementById('main-image');
  
    // Tarkista, että elementti on olemassa ennen kuin yrität muuttaa sen src-ominaisuutta
    if (mainImage) {
      mainImage.src = `images/${imageName}`;
    } else {
      console.error('Element with ID "main-image" not found.');
    }
  }
  
  