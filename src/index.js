const express = require('express');
const cors = require('cors');
//5. Importo con require el movies.json en src/index.js
const movies = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//3. Creamos un ENDPOINT para escuchar las peticiones que acabamos de programar en el front y a contnuación responde a la petición con los datos
server.get('/movies', (req, res) => {
  res.json(movies);
});