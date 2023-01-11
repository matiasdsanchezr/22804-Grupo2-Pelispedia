import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';
import SignInRoute from './Components/SignInRoute';
import { AuthProvider } from './Contexts/AuthContext';
import About from './Pages/About';
import { DetallePelicula } from './Pages/DetallePelicula';
import Error404 from './Pages/Error404';
import Favoritos from './Pages/Favoritos';
import Login from './Pages/Login';
import LoginHelp from './Pages/LoginHelp';
import Peliculas from './Pages/Peliculas';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp';
import styles from './Styles/App.module.css';

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: 'always',
      refetchOnWindowFocus: 'false',
      refetchOnReconnect: 'always',
      cacheTime: 1000 * 60, // 60 seconds
      refetchInterval: 1000 * 60, // 60 seconds
      refetchIntervalInBackground: false,
      suspense: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 2,
    },
    // logger: {
    //   log: () => null,
    //   warn: () => null,
    //   error: () => null,
    // },
  },
};

// Desactivar registro de errores en React Query
const queryClient = new QueryClient(queryClientConfig);

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <Error404 />,
    children: [
      {
        element: <SignInRoute />,
        children: [
          { path: '/', element: <Login /> },
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <SignUp /> },
          { path: '/loginHelp', element: <LoginHelp /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/peliculas',
            children: [
              { index: true, element: <Peliculas /> },
              { path: 'search/', element: <Peliculas /> },
              { path: 'search/:search', element: <Peliculas /> },
              { path: ':idPelicula', element: <DetallePelicula /> },
            ],
          },
          { path: '/favoritos', element: <Favoritos /> },
          { path: '/about', element: <About /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className={styles.App}>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
