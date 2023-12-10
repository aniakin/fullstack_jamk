const http = require('http');
const fs = require('fs');

let requestCounter = 0;

const server = http.createServer((req, res) => {
  requestCounter++;

  fs.writeFile('pyyntolaskuri.txt', requestCounter.toString(), (err) => {
    if (err) {
      console.error('Virhe kirjoitettaessa tiedostoon:', err);
    }
  });

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Request counter value is ${requestCounter}.`);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}/`);
});