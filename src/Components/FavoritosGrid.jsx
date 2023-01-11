// import { useQueryClient } from '@tanstack/react-query';

import { useGetMoviesById } from '../Hooks/movies.hooks';
import { useFavorites } from '../Hooks/user.hooks';
import styles from '../Styles/PeliculasGrid.module.css';
import { Loader } from './Loader';
import { PeliculaCard } from './PeliculaCard';

export const FavoritosGrid = () => {
  // const queryClient = useQueryClient();

  // Cargar IDs de los favoritos del usuario en Firebase
  const { data: favoritesIds, isLoading, isSuccess } = useFavorites();

  // Cargar detalles de las peliculas usando sus IDs
  const peliculas = useGetMoviesById(isSuccess, favoritesIds);

  if (isLoading || peliculas.some((query) => query.isLoading))
    return <Loader />;

  if (!peliculas.length)
    return (
      <div className={styles.noFav}>
        <h3>No hay películas en favoritos</h3>
      </div>
    );

  return (
    <>
      <ul className={styles.peliculasGrid}>
        {peliculas.map((pelicula) => (
          <PeliculaCard
            key={pelicula.data.id}
            pelicula={pelicula.data}
            isFavorite={true}
          />
        ))}
      </ul>
    </>
  );
};
