import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

import { PeliculasGrid } from '../Components/PeliculasGrid';
import { fetchMovies } from '../Services/moviesApi';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // const search = params.search;
    // const url =
    //   search && search !== ''
    //     ? `/search/movie?query=${search}&page=1&language=es-MX`
    //     : '/discover/movie?page=1&language=es-MX';
    // const query = async () => fetchMovies(url);
    // return await queryClient.fetchInfiniteQuery({
    //   queryKey: ['movies'],
    //   queryFn: query,
    //   staleTime: 0,
    // });
  };

function Peliculas() {
  const { search } = useParams();

  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿</title>
        <meta name="keywords" content="peliculas estrenos api tmdb" />
        <meta name="description" content="catalogo de peliculas " />
      </Helmet>
      <PeliculasGrid search={search} />
      <ScrollToTop
        title="subir"
        smooth
        style={{
          backgroundColor: 'white',
          padding: '.5rem',
          border: 'none',
          bottom: '10rem',
        }}
      />
    </>
  );
}

export default Peliculas;
