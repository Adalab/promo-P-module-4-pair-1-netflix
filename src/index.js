const express = require("express");
const cors = require("cors");

//Importamos datos 
const dataMovies = require("./data/movies.json");
const users = require('./data/users.json');

//Importamos el modulo better-sqlite3 
const Database = require('better-sqlite3');

const { response } = require("express");
const { process_params } = require("express/lib/router");
const req = require("express/lib/request");
const res = require("express/lib/response");

// Create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//Configuramos el motor de plantillas añadiendo la línea
server.set('view engine', 'ejs');

//Configuramos las BASE DE DATOS en Node JS
const db = Database('./src/data/database.db', { verbose: console.log });
const dbusers = Database('./src/data/datausers.db', { verbose: console.log });
const dbrelmovusers = Database('./src/data/datarelmovusers.db', { verbose: console.log });

//Creamos un ENDPOINT para escuchar las peticiones que acabamos de programar en el front todo ello para obtener las peliculas 
server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender;
  //const sortFilterParam = a.title.localeCompare(z.title);

  const query = db.prepare('SELECT * FROM movies');
  const movies = query.all();
  console.log(movies);
  return res.json({
    success: true,
    movies: movies
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
  
  
//ENDPOINT de las usuarias (de donde cogemos al inicio la info de las usuarias)
// server.post("/login", (req, res) => {
//   let exist = users.find((user) => {
//     if (user.email === req.body.email && user.password === req.body.password) {
//       return user;
//     }
//     return null;
//   });

//   if (!exist) {
//     return res.status(404).json({
//       success: false,
//       errorMessage: 'Usuaria/o no encontrada/o',
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     userId: exist.id,
//   });
// });

//Ahora la cogeremos desde la base de datos (previa creación de la tabla de las usuarias) con un SELECT.
server.post('/login', (req, res) => {
  const emailFind = req.body.email;
  const passwordFind = req.body.password;
  const query = dbusers.prepare(
    `SELECT * FROM users WHERE email = ? AND password = ?`
  );
  const exist = query.get(emailFind, passwordFind);

  if (exist !== undefined) {
    return res.status(200).json({
      success: true,
      userId: exist.id,
    });
  } else {
    console.log('Error fatal');
    return res.status(404).json({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  }
});

//Registramos nuevas usuarias en Back y Comprobamos que no hay una usuaria registrada con el mismo email.
server.post('/signup', (req, res) => {
  const email = dbusers.prepare(`SELECT email FROM users WHERE email=?`);
  const foundUser = email.get(req.body.email);

  //Comprobamos si el email ya existe en nuestra db
  if (foundUser === undefined) {
    const query = dbusers.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`);
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

server.get('/user/movies', (req, res) => {
  res.json({
    success: true,
    movies: movies,
  });
});

//En origen, para crear el MOTOR DE PLANTILLAS, antes tenemos que crear un endpoint para escuchar las peticiones, y cogia los datos de src/data/movies.json:
// server.get('/movie/:movieId', (req, res) => {
//   //console.log('URL params:', req.params);
//   const foundMovie = dataMovies.movies.find((movie) => movie.id === req.params.movieId);
//   //console.log(foundMovie);
//   res.render('movie', foundMovie);
//  });

//AHORA, el MOTOR DE PLANTILLAS, debe obtener los datos de la BASE DE DATOS tambien.
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


//Configuramos el servidor de estáticos de Express
const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos//
server.use(express.static(staticServerPathWeb));//

//Configuramos el servidor de estáticos para las fotos
const staticServerPathImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathImages));

//Configuramos el servidor de estáticos para los estilos
const staticServerStyles = './src/public-css';
server.use(express.static(staticServerStyles));
