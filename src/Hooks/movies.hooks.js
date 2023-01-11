import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuth } from '../Contexts/AuthContext';
import { fetchMovies as get } from '../Services/moviesApi';
import { addFavorito, removeFavorito } from '../Services/userService';

export const useInfiniteMovies = (search) => {
  const fetchMovies = async ({ pageParam = 1 }) => {
    const url =
      search && search !== ''
        ? `/search/movie?query=${search}&page=${pageParam}&language=es-MX`
        : `/discover/movie?page=${pageParam}&language=es-MX`;
    return await get(url);
  };

  return useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length === lastPage.total_pages) return null;
      return pages.length + 1;
    },
  });
};

export const useResetMovies = async () => {
  const queryClient = useQueryClient();
  await queryClient.invalidateQueries({ queryKey: ['movies'] });
};

export const useGetMovieById = (idPelicula) =>
  useQuery({
    queryKey: ['movieDetails'],
    queryFn: async () => await get('/movie/' + idPelicula + '?language=es-MX'),
  });

export const useGetMoviesById = (enabled, moviesIds) => {
  // Realiza un fetch a la api de peliculas para traer los datos de la pelicula
  const getMoviebyId = async (id) => {
    const busquedaUrl = `/movie/${id}`;
    return await get(busquedaUrl);
  };

  if (!moviesIds) moviesIds = [];

  return useQueries({
    queries: moviesIds.map((movieId) => ({
      queryKey: ['moviesDetails', movieId],
      queryFn: () => getMoviebyId(movieId),
      enabled: enabled,
    })),
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: async ({ isFavorite, pelicula }) =>
      isFavorite
        ? await removeFavorito(currentUser.uid, pelicula.id)
        : await addFavorito(currentUser.uid, pelicula.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useSocialMedia = (idPelicula) =>
  useQuery({
    queryKey: ['socialMedia'],
    queryFn: async () => await get('/movie/' + idPelicula + '/external_ids'),
  });

export const useReviews = (idPelicula) => {
  const fetchMovieReview = async () =>
    await Promise.all([
      get(`/movie/${idPelicula}/reviews`),
      get(`/movie/${idPelicula}/reviews?language=es-MX`),
    ]).then((res) => (res[1].results.length > 0 ? res[1] : res[0]));

  return useQuery({
    queryKey: ['review'],
    queryFn: fetchMovieReview,
  });
};

export const useMovieTrailer = (idPelicula) => {
  const fetchMovieTrailer = async () =>
    await Promise.all([
      get(`/movie/${idPelicula}/videos`),
      get(`/movie/${idPelicula}/videos?language=es-MX`),
    ]).then((res) => (res[1].results.length > 0 ? res[1] : res[0]));

  return useQuery({
    queryKey: ['trailer'],
    queryFn: fetchMovieTrailer,
  });
};
