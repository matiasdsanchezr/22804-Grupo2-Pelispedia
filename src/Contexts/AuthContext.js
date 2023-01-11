import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail as authUpdateEmail,
  updatePassword as authUpdatePassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router';

import { auth, db } from '../firebase';

const AuthContext = React.createContext();

// Funciones para manejar el user context, variables de ambiente del usuario y datos en Firebase Authentication
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  auth.onAuthStateChanged((user) => {
    setIsLoading(false);
    setCurrentUser(user);
  });

  // SignUp: Firebase -> 1. crea un doc en Authentication (obteniendo userId) y 2. crea un doc en la colección usuarios con el mismo userId
  const signUp = async ({ email, password, userName }) => {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((user) => setCurrentUser(user));
    const user = res.user;
    await setDoc(doc(db, 'usuarios', user.uid), {
      userId: user.uid,
      userEmail: email,
      userNombre: userName,
      userApellido: '',
    });
  };

  const signIn = async ({ email, password }) =>
    await signInWithEmailAndPassword(auth, email, password);

  const signOut = async () => await auth.signOut();

  const resetPassword = async (email) =>
    await sendPasswordResetEmail(auth, email);

  const updateEmail = async (email) =>
    await authUpdateEmail(currentUser, email);

  const updatePassword = async (password) =>
    await authUpdatePassword(currentUser, password);

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && <Outlet />}
    </AuthContext.Provider>
  );
}
