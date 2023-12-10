const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { 'id': '1', 'name': 'Kirsi Kernel' },
  { 'id': '2', 'name': 'Matti Mainio' }
];

app.get('/users', (request, response) => {
  response.json(users);
});

app.get('/users/:id', (request, response) => {
  const { id } = request.params;
  const user = users.find(user => user.id === id);
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

app.delete('/users/:id', (request, response) => {
  const { id } = request.params;
  users = users.filter(user => user.id !== id);
  response.status(204).end();
});

app.put('/users/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.query;
  const user = users.find(user => user.id === id);
  if (user) {
    user.name = name;
    response.status(200).end();
  } else {
    response.status(204).end();
  }
});

app.post('/users/', (request, response) => {
  const maxId = Math.max(...users.map(user => parseInt(user.id, 10)), 0);
  const user = request.body;
  user.id = (maxId + 1).toString();
  users = users.concat(user);
  response.json(user);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
