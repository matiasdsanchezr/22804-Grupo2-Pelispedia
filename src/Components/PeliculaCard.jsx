import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useToggleFavorite } from '../Hooks/user.hooks';
import { obtenerPosterPelicula } from '../Services/obtenerPosterPelicula';
import styles from '../Styles/PeliculasCard.module.css';
import { FavoriteStar } from './FavoriteStar';

const showToast = (msg) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: <strong>{msg}</strong>,
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
  });
};

export const PeliculaCard = ({ pelicula, isFavorite }) => {
  const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 300);
  const toggleFavorite = useToggleFavorite();

  // Comprueba si se ha realizado click para quitar o agregar pelicula a favorito
  const handleStarClick = useCallback(() => {
    const msg = isFavorite ? 'Quitado de favoritos!' : 'Agregado a favoritos!';
    toggleFavorite.mutate(
      { isFavorite, pelicula },
      { onSuccess: () => showToast(msg) }
    );
  }, [pelicula, isFavorite, toggleFavorite]);

  return (
    <li className={styles.peliculaCard}>
      <Link to={'/peliculas/' + pelicula.id}>
        <img
          width={230}
          height={345}
          className={styles.peliculaImg}
          src={imgUrl}
          alt="Poster de la Pelicula"
        />
      </Link>
      <div className={styles.peliculaTitulo}>
        <span>{pelicula.title}</span>
        <span>
          <FavoriteStar active={isFavorite} onClick={handleStarClick} />
        </span>
      </div>
    </li>
  );
};

PeliculaCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  pelicula: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
