const express = require("express");
const cors = require("cors");
//5. Importo con require el movies.json en src/index.js
const dataMovies = require("./data/movies.json");
const users = require('./data/users.json');
const { response } = require("express");
const { process_params } = require("express/lib/router");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//3. Creamos un ENDPOINT para escuchar las peticiones que acabamos de programar en el front y a contnuación responde a la petición con los datos. Todo ello para obtener las peliculas 
server.get("/movies", (req, res) => {
  //6. como ya lo tengo importado, dentro de este endpoint que he creado en el punto 3, me retorno las peliculas
  //guardamos el valor del query param de género en una constante
  const genderFilterParam = req.query.gender;

  //Respondemos con el listado filtrado.
  res.json({
    success: true,
    movies: dataMovies.movies
      .filter((item) => item.gender.includes(genderFilterParam))
      .sort(function (a, z) {
        const sortFilterParam = a.title.localeCompare(z.title);
        if (req.query.sort === 'asc') {
          return sortFilterParam;
        } else {
          return sortFilterParam * -1;
        }
      }),
  });
});


server.post("/login", (req, res) => {
  let exist = users.find((user) => {
    if (user.email === req.body.email && user.password === req.body.password) {
      return user;
    }
    return null;
  });

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

//4.4.1 Para crear un motor de plantillas, 1. antes tenemos que crear un endpoint para escuchar las peticiones:
server.get('/movie/:movieId', (req, res) => {
  //console.log('URL params:', req.params);
  const foundMovie = dataMovies.movies.find((movie) => movie.id === req.params.movieId);
  console.log(foundMovie);
 });

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos//
server.use(express.static(staticServerPathWeb));//

const staticServerPathImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathImages));
 
