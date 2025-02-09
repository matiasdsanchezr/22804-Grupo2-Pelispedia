import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';

// addFavorito: agrega un doc en la colección favoritos con userId, peliId
export const addFavorito = async (userId, peliId) =>
  await addDoc(collection(db, 'favoritos'), { userId, peliId });

// isFavorito: chequea que exista un doc en favoritos haciendo query con userId+peliId
export const isFavorito = async (userId, peliId) => {
  const conditions = [
    where('userId', '==', userId),
    where('peliId', '==', peliId),
  ];
  const queryFavoritos = query(collection(db, 'favoritos'), ...conditions);
  const favoritos = await getDocs(queryFavoritos);
  return favoritos.empty;
};

// getFavorito: dado un userId, devuelve la colección de favoritos (userId, peliId)
export const getFavorito = async (userId) => {
  const queryFavoritos = query(
    collection(db, 'favoritos'),
    where('userId', '==', userId)
  );
  const favoritos = await getDocs(queryFavoritos);
  return favoritos.docs.map((doc) => doc.data().peliId.toString());
};

// removeFavorito: en la colección favoritos, dado un userId+peliId se remueve el doc
export const removeFavorito = async (userId, peliId) => {
  const conditions = [
    where('userId', '==', userId),
    where('peliId', '==', peliId),
  ];
  const queryFavoritos = query(collection(db, 'favoritos'), ...conditions);
  const favoritos = await getDocs(queryFavoritos);
  const promises = favoritos.docs.map(
    async (favorite) => await deleteDoc(doc(db, 'favoritos', favorite.id))
  );
  return await Promise.all(promises);
};

// getUserById: devuelve de la colección usarios los datos del userId pasado como parámetro
export const getUserById = async (userId) => {
  const colRef = collection(db, 'usuarios');
  const response = await getDoc(doc(colRef, userId));
  const userInfo = response.data();
  return userInfo;
};
