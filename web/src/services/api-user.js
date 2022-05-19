// login

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

// signup

const sendSingUpToApi = data => {
  console.log('Se están enviando datos al signup:', data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR
  return fetch('http://localhost:4000/signup', {
  //Cambio el fetch para que use el verbo/metodo POST.  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then(response => response.json())
    .then(() => {
      return data;
      //Borro el contenido del segundo then para que me retorne los datos introducidos en data, es decir, email y password, para pasarselo a React.
    });
};

// profile

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
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json')
    .then(response => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        movies: [
          {
            id: 1,
            title: 'Gambita de dama',
            gender: 'Drama',
            image:
              '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
          }
        ]
      };
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
