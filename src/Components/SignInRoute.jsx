import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import styles from '../Styles/App.module.css';
import Footer from './Footer';
import NavBarCanvas from './NavbarCanvas';

const SignInRoute = () => {
  // Obtiene datos del usuario
  const { currentUser } = useAuth();
  // Comprueba que exista ese usuario y de ser asi redirecciona a peliculas
  if (currentUser) return <Navigate to="/peliculas" replace={true} />;

  return (
    <>
      <header>
        <NavBarCanvas />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};

export default SignInRoute;
