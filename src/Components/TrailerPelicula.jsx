// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../Components/Loader';
import { useMovieTrailer } from '../Hooks/movies.hooks';
import styles from '../Styles/TrailerPelicula.module.css';

export default function TrailerPelicula() {
  const { idPelicula } = useParams();

  // Cargar trailer en español o ingles segun disponibilidad
  const { data, isLoading, isFetching } = useMovieTrailer(idPelicula);

  if (isLoading || isFetching) return <Loader />;

  if (!data) return null;

  return (
    data.results.length > 0 && (
      <div className={styles.container}>
        <h2>Mirá el trailer: {data.results[0].name}</h2>
        <iframe
          src={`https://www.youtube.com/embed/${data.results[0].key}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={data.results[0].name}
        />
      </div>
    )
  );
}
