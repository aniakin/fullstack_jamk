const fs = require('fs');

function calculateSum() {
  const filename = 'h5task3';
  
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Lukuvirhe tiedostossa:', err);
      return;
    }

    const numbers = data.split(',').map(num => parseInt(num.trim(), 10));

    const sum = numbers.reduce((acc, num) => acc + num, 0);

    console.log('Summa on', sum);
  });
}

console.log('Lue tiedoston luvut ja tulosta näytölle lukujen summan...');
calculateSum();