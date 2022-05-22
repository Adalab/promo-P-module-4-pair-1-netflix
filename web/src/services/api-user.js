// login (acceso de la usuaria)

const sendLoginToApi = data => {
  console.log('Se están enviando datos al login:', data);
  //Creamos body params
  //Cambio este fetch para que apunte a un endpoint de mi servidor, con la ruta buena de login.
  return fetch('http://localhost:4000/login', {
  //Cambio el fetch para que use el verbo/metodo POST.
    method: 'POST',
  //Añado al fetch los datos de email y password sacados de data para que se envien como body params.
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  .then((response) => response.json())
  .then((data) => {
    return data;
    //Borro el contenido del segundo then para que me retorne los datos introducidos en data, es decir, email y password, para pasarselo a React.
  });
};



// signup (registrar a la usuaria)

const sendSingUpToApi = data => {
  console.log('Se están enviando datos al signup:', data);
  //Cambio este fetch para que apunte a un endpoint de mi servidor.
  return fetch('http://localhost:4000/signup', {
  //Cambio el fetch para que use el verbo/metodo POST (crea nuevos datos en el servidor).
  method: 'POST',
  //Añado al fetch los datos de email y password sacados de data para que se envien como body params.
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  .then((response) => response.json())
  .then((data) => {
    return data;
    //Borro el contenido del segundo then para que me retorne los datos introducidos en data, es decir, email y password, para pasarselo a React.
  });
};



// profile (perfil de la usuaria) -> ESTE PUNTO NO SE HA TOCADO. 

const sendProfileToApi = (userId, data) => {
  console.log('Se están enviando datos al profile:', userId, data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json');
};

const getProfileFromApi = userId => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json')
    .then(response => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        name: 'Maricarmen',
        email: 'mari@mail.com',
        password: '1234567'
      };
    });
};



// user movies

const getUserMoviesFromApi = userId => {
  console.log('Se están pidiendo datos de las películas de la usuaria:', userId);
  //Cambio este fetch para que apunte a un endpoint de mi servidor.
  return fetch('//localhost:4000/user/movies', {
    //Cambio el fetch para que use el verbo/metodo GET (pide datos al servidor).
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi
};

export default objToExport;
