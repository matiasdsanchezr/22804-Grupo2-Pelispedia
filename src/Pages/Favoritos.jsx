import { Helmet } from 'react-helmet-async';

import { FavoritosGrid } from '../Components/FavoritosGrid';

function Favoritos() {
  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿 || Favoritos</title>
        <meta name="keywords" content="peliculas estrenos api tmdb" />
        <meta name="description" content="pagina de peliculas favoritas " />
      </Helmet>

      <FavoritosGrid />
    </>
  );
}

export default Favoritos;
