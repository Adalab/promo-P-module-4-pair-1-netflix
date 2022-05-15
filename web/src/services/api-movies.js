// login
//Pasamos como paramtro params, porque previamente ya está recibiendo un objeto con el género seleccionado por la usuaria.
const getMoviesFromApi = (params) => {
  // console.log(params);
  console.log('Se están pidiendo las películas de la app');
  // 1. CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`//localhost:4000/movies?gender=${params.gender}&sort=${params.sort}`,
    { method: "GET" }
  )

  .then((response) => response.json())
  .then((data) => {
    // 2. CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      console.log(data);
     return data;
  });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
