import html2canvas from 'html2canvas';
import { Animated } from 'react-animated-css';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { Loader } from '../Components/Loader';
import RedesSocialesPeliculas from '../Components/RedesSocialesPeliculas';
import ReviewPeliculas from '../Components/ReviewPeliculas';
import TrailerPelicula from '../Components/TrailerPelicula';
import { useGetMovieById } from '../Hooks/movies.hooks';
import {
  obtenerBackdropPelicula,
  obtenerPosterPelicula,
} from '../Services/obtenerPosterPelicula';
import styles from '../Styles/DetallePelicula.module.css';

export function DetallePelicula() {
  const { idPelicula } = useParams();

  // Cargar datos de la pelicula usando un custom hook con React Query
  const { data: pelicula, isLoading, isFetching } = useGetMovieById(idPelicula);

  if (isLoading || isFetching) return <Loader />;

  if (!pelicula) return null;

  // html2canvas - Función que le permite al usuario descargar la información de la pelicula
  const descargarInfo = () => {
    html2canvas(document.getElementById('infoDescargar'), {
      backgroundColor: '#333333',
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'InfoPelicula.png';
      link.crossOrigin = 'true';
      link.click();
    });
  };

  // Rutas imagenes
  const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 500);
  const backdropUrl = obtenerBackdropPelicula(pelicula.backdrop_path, 500);

  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿 || {pelicula.title}</title>
        <meta name="keywords" content="tmdb pelicula" />
        <meta name="description" content="detalle de pelicula " />
      </Helmet>
      <div id="infoDescargar" className={styles.containerPrincipal}>
        <div
          className={styles.contenedorBg}
          style={{
            background: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
        <div className={styles.contenedor}>
          <figure>
            <Animated
              animationIn="fadeInLeft"
              animationInDuration={1000}
              isVisible={true}
            >
              <img src={imgUrl} alt="Imagen de la pelicula" />
            </Animated>
          </figure>
          <div className={styles.contenedorDescripcion}>
            <p className={styles.titulo}>
              {pelicula.title}({new Date(pelicula.release_date).getFullYear()})
            </p>

            <div className={styles.detallePelicula}>
              <span title="fecha de estreno">{pelicula.release_date}</span>
              <span style={{ marginRight: '1rem', marginLeft: '1rem' }}>●</span>
              <span>
                {pelicula.adult ? (
                  <p title="a partir mayores de 16 años">+16</p>
                ) : (
                  <p title="apto todo público">ATP</p>
                )}
              </span>
              <span style={{ marginRight: '1rem', marginLeft: '1rem' }}>●</span>
              <span>
                {pelicula.genres.map((genero) => genero.name).join(', ')}
              </span>
              <span style={{ marginRight: '1rem', marginLeft: '1rem' }}>●</span>
              {pelicula.runtime > '0' && <span>{pelicula.runtime} min</span>}
            </div>
            <div className={styles.puntuacion}>
              <p className={styles.rating} title="puntuación">
                {pelicula.vote_average.toFixed(1)}
              </p>
            </div>
            <div className={styles.descripcion}>
              <p>Descripción:</p>
              <div>
                {pelicula.overview ? (
                  <p>{pelicula.overview}</p>
                ) : (
                  <p>-sin datos-</p>
                )}
              </div>
            </div>

            {pelicula.tagline && (
              <em className={styles.cita}>“{pelicula.tagline}”</em>
            )}
            <div className={styles.descripcionDirectores}>
              <div>
                <b>Pais:</b>
                {pelicula.production_countries[0] ? (
                  <p>{pelicula.production_countries[0].name}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <b>Productora:</b>
                {pelicula.production_companies[0] ? (
                  <p>{pelicula.production_companies[0].name}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className={styles.btnDescargarInfo}
              onClick={descargarInfo}
            >
              ↓ Descargar Info
            </button>
          </div>
        </div>
      </div>
      <div className={styles.trailerBox}>
        {/* animacion react-animated-css */}
        <Animated
          animationIn="slideInUp"
          animationInDuration={1000}
          isVisible={true}
        >
          <div className={styles.trailer}>
            <TrailerPelicula />
          </div>
        </Animated>
        <div className={styles.SocialReview}>
          <RedesSocialesPeliculas />
          <ReviewPeliculas />
        </div>
      </div>
    </>
  );
}
