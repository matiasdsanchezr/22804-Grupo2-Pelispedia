import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useReviews } from '../Hooks/movies.hooks';
import styles from '../Styles/ReviewPeliculas.module.css';
import { Loader } from './Loader';

export default function ReviewPeliculas() {
  const { idPelicula } = useParams();
  const [invalidImg, setInvalidImage] = useState(false);

  // Renderiza cada vez que se actualiza el id de pelicula para mostrar su información(poster, puntuación y reseña)
  const { data, isLoading, isFetching } = useReviews(idPelicula);

  if (isLoading || isFetching) return <Loader />;
  if (!data || data.results.length < 1) return null;

  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <p className={styles.authorLine}>
          {invalidImg ? (
            <FontAwesomeIcon icon={faCircleUser} className={styles.imgAvatar} />
          ) : (
            <img
              src={`https://www.themoviedb.org/t/p/w45_and_h45_face/${data.results[0].author_details.avatar_path}`}
              alt="usuario"
              className={styles.imgAvatar}
              onError={() => setInvalidImage(true)}
            />
          )}
          {data.results[0].author_details.username}
        </p>
        {data.results[0].author_details.rating != null && (
          <p className={styles.puntuacion}>
            Puntuación:{' '}
            <span className={styles.rating}>
              {data.results[0].author_details.rating}
            </span>
          </p>
        )}
      </div>
      <p>Reseña: </p>
      <div className={styles.review}>
        <p>{data.results[0].content}</p>
      </div>
    </div>
  );
}
