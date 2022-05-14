const express = require("express");
const cors = require("cors");
//5. Importo con require el movies.json en src/index.js
const movies = require("./data/movies.json");
const users = require('./data/users.json');

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
server.get("/movies", (req, res) => {
  //6. como ya lo tengo importado, dentro de este endpoint que he creado en el punto 3, me retorno las peliculas
  res.json(movies);
});

server.post("/login", (req, res) => {
  let exist = users.find((user) => {
    if (user.email === req.body.email && user.password === req.body.password) {
      //console.log(user);
      return user;
    }
    return null;
  });
  //console.log(exist);
  if (!exist) {
    return res.status(404).json({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  }
  return res.status(200).json({
    success: true,
    userId: exist.id,
  });
});


const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos//
server.use(express.static(staticServerPathWeb));//

const staticServerPathImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathImages));
 
