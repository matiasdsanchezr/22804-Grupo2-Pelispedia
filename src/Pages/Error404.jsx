import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import styles from '../Styles/Error404.module.css';

// Renderiza una página 404 diseñada para el usuario con información de lo ocurrido en caso de error y redirección a pagina principal
// Function Error404 : devuelve la página correspondiente al error 404, page not found
export default function Error404() {
  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿 || upppsssss...</title>
        <meta name="keywords" content="tmdb pelicula" />
        <meta name="description" content="detalle de pelicula " />
      </Helmet>
      <div className={styles.container}>
        <figure>
          <img src="./404.png" alt="error_404" />
        </figure>
        <div className={styles.text}>
          <h2>awww... No te preocupes.</h2>
          <p className={styles.error}>es solo un error 404!</p>
          <p>
            lo que busca puede haberse extraviado en la memoria a largo plazo
          </p>
          <Link to="/peliculas" className={styles.volver}>
            ↩ Volver
          </Link>
        </div>
      </div>
    </>
  );
}
