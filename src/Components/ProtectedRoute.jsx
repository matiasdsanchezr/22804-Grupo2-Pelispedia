import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import styles from '../Styles/App.module.css';
import Footer from './Footer';
import NavBarCanvas from './NavbarCanvas';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace={true} />;

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

export default ProtectedRoute;
