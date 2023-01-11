import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../Contexts/AuthContext';
import {
  addFavorito,
  getFavorito,
  getUserById,
  removeFavorito,
} from '../Services/userService';

export const useUserInfo = () => {
  const { currentUser } = useAuth();
  const fetchUserInfo = async () =>
    currentUser
      ? await getUserById(currentUser.uid)
      : { userNombre: 'Usuario no identificado' };
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    onSuccess: (userInfo) => {
      userInfo ? userInfo : { userNombre: 'Usuario no identificado' };
    },
  });
};

export const useFavorites = () => {
  const { currentUser } = useAuth();
  const fetchFavorites = async () =>
    await getFavorito(currentUser.uid).then((res) => [...new Set(res)]);

  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
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
