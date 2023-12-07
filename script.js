document.addEventListener("DOMContentLoaded", function() {
    // Tässä vaiheessa DOM on valmis
    // Voit laittaa täällä muita koodisi
  
    function changeImage(imageName) {
      const mainImage = document.getElementById('main-image');
    
      if (mainImage) {
        mainImage.src = `images/${imageName}`;
      } else {
        console.error('Element with ID "main-image" not found.');
      }
    }
  });