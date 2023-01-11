import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useInfiniteMovies } from '../Hooks/movies.hooks';
import { useFavorites } from '../Hooks/user.hooks';
import Error404 from '../Pages/Error404';
import styles from '../Styles/PeliculasGrid.module.css';
import { Loader } from './Loader';
import { PeliculaCard } from './PeliculaCard';

export const PeliculasGrid = ({ search }) => {
  const isFavorito = (pelicula) => favorites.includes(pelicula.id.toString());

  // Cargar lista de favoritos desde Firebase usando un custom hook
  const { data: favorites, status: favoritesStatus } = useFavorites();

  // Cargar lista de peliculas desde TheMovieDB usando un custom hook
  const {
    data: moviesQuery,
    status: moviesStatus,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteMovies(search);

  if (moviesStatus === 'error' || favoritesStatus === 'error')
    return <Error404 />;

  if (moviesStatus === 'loading' || favoritesStatus === 'loading')
    return <Loader />;

  return (
    <InfiniteScroll
      dataLength={moviesQuery.pages.length}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<Loader />}
    >
      <ul className={styles.peliculasGrid}>
        {moviesQuery.pages.map((page) => (
          <React.Fragment key={page.page}>
            {page.results.map((movie) => (
              <PeliculaCard
                key={movie.id}
                isFavorite={isFavorito(movie)}
                pelicula={movie}
              />
            ))}
          </React.Fragment>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

PeliculasGrid.propTypes = {
  search: PropTypes.string,
};

PeliculasGrid.defaultProps = {
  search: '',
};
