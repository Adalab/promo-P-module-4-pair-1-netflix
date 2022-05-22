const { response } = require("express");
const { process_params } = require("express/lib/router");
const req = require("express/lib/request");
const res = require("express/lib/response");

//Importamos módulos
const express = require("express");
const cors = require("cors");
const Database = require('better-sqlite3');

//Creamos y configuramos el servidor
const server = express();
server.use(cors());
server.use(express.json());

//Configuramos el motor de plantillas 
server.set('view engine', 'ejs');

//Importamos datos 
const dataMovies = require("./data/movies.json");
const users = require('./data/users.json');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//Configuramos las BASE DE DATOS en Node JS (Aunque lo correcto sería una base de datos con 3 tablas).
const db = Database('./src/data/database.db', { verbose: console.log });




//ENDPOINTS

//ENDPOINT PELICULAS: para escuchar las peticiones que hemos programado en el front todo ello para obtener las peliculas 
server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender ||'';
  const sortFilterParam = req.query.sort || 'asc';

  let moviesList = [];

  if (genderFilterParam === '') {
    //Preparamos la query
    const query = db.prepare (`SELECT * FROM movies ORDER BY title ${sortFilterParam}`);

    //Ejecutamos la query
    moviesList = query.all();

  } else {
    //Preparamos de nuevo la query
    const query = db.prepare (`SELECT * FROM movies WHERE gender=? ORDER BY title ${sortFilterParam}`);

    //Ejecutamos de nuevo la query
    moviesList = query.all(genderFilterParam)
  }

  //Respondemos a la peticion anterior con los datos devueltos por la base de datos
  const response = {
    success: true,
    movies: moviesList,
  };
  res.json(response);
});
  

//ENDPOINT USUARIAS (login): ahora la cogeremos desde la base de datos (previa creación de la tabla de las usuarias) con un SELECT.
server.post('/login', (req,res) => {
  const emailFind = req.body.email;
  const passwordFind = req.body.password;

  const query = db.prepare(`SELECT * FROM users WHERE email = ? AND password =?`);

  const loggedUser = query.get(emailFind, passwordFind);

  if (loggedUser) {
    res.json ({
      success: true,
      userId: loggedUser.id,
    });
  } else {
    res.json ({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  }

});


//ENDPOINT USUARIAS(signup): Registramos nuevas usuarias en Back y Comprobamos que no hay una usuaria registrada con el mismo email.
server.post('/signup', (req, res) => {
  const email = db.prepare(`SELECT email FROM users WHERE email=?`);
  const foundUser = email.get(req.body.email);

  //Comprobamos si el email ya existe en nuestra db
  if (foundUser === undefined) {
    const query = db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`);
    const result = query.run(req.body.email, req.body.password);
    res.json({
      success: true,
      errorMessage: 'Su usuario/a ha sido registrado/a con éxito',
      userId: result.lastInsertRowid,
    });
  } else {
    res.json({
      success: false,
      errorMessage: 'Lo sentimos, usuario/a ya registrado/a.',
    });
  }
});

//ENDPOINT USUARIAS Y PELICULAS: con el id de las películas de una usuaria. Estamos usando aqui las 3 bases de datos.
server.get('/user/movies', (req, res) => {

    // Preparamos la query para obtener los movieIds
    const movieIdsQuery = db.prepare(
      'SELECT movieId FROM rel_movies_users WHERE userId = ?');

    // Obtenemos el id de la usuaria 
  const userId = req.header('user-id');

    // Ejecutamos la query y os devuelve algo como [{ movieId: 1 }, { movieId: 2 }];
  const movieIds = movieIdsQuery.all(userId); 
 
  //Obtenemos las interrogaciones separadas por comas
  const moviesIdsQuestions = movieIds.map((id) => '?').join(', '); // Que nos devuelve '?, ?'

  //Preparamos la segunda query para obtener todos los datos de las peliculas
  const moviesQuery = db.prepare(
    `SELECT * FROM movies WHERE id IN (${moviesIdsQuestions})`);

  //Convertimos el array de objetos de id anterior a un array de numeros que nos devuelve asi [1.0, 2.0]
  const moviesIdsNumbers = movieIds.map((movie) => movie.movieId);

  //Ejecutamos la segunda query
  const movies = moviesQuery.all(moviesIdsNumbers);

  //Respondemos a la peticion de la siguiente manera: 
  res.json({
    success: true,
    movies: movies,
  });
});




//AHORA, el MOTOR DE PLANTILLAS, debe obtener los datos de la BASE DE DATOS también.
server.get('/movie/:movieId', (req, res) => {
  const query = db.prepare(
    `SELECT  * FROM movies WHERE id=${req.params.movieId}`
  );
  const foundMovie = query.get();
  if (foundMovie) {
    res.render('movie', foundMovie);
  } else {
    const error = { error: req.url };
    res.render('movie-not-found', error);
  }
});



//SERVIDORES DE ESTÁTICOS

//Configuramos el servidor de estáticos de EXPRESS
const staticServerPathWeb = "./src/public-react"; //En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

//Configuramos el servidor de estáticos para las FOTOS
const staticServerPathImages = "./src/public-movies-images"; //En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathImages));

//Configuramos el servidor de estáticos para los ESTILOS
const staticServerStyles = './src/public-css'; //En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerStyles));
