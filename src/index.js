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
  const response = {
    success: true,
    movies: [
      {
        id: "1",
        title: "Gambita de dama",
        gender: "Drama",
        image: "https://via.placeholder.com/150",
      },
      {
        id: "2",
        title: "Friends",
        gender: "Comedia",
        image: "https://via.placeholder.com/150",
      },
    ],
  };
  console.log(response);
  res.json(response);
});