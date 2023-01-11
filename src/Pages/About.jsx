import { Helmet } from 'react-helmet-async';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ScrollToTop from 'react-scroll-to-top';

import { aboutInfo } from '../data/about';
import styles from '../Styles/About.module.css';

// Function About: página acerca del proyecto, comisión, integrantes, etc.
export default function About() {
  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿 || Nosotros</title>
        <meta name="keywords" content="tmdb pelicula nosotros" />
        <meta name="description" content="pagina acerca de quienes somos " />
      </Helmet>
      <div className={styles.container}>
        <h2>Nuestro equipo</h2>
        <p className={styles.text}>
          Somos la comisión 22804 del curso React en codo a codo 4.0. Esta
          página es producto del trabajo integrador de la cursada de la Prof.
          Gisela Flores.
        </p>
        <section className={styles.container_cards}>
          {aboutInfo.map((e) => (
            // Card
            <figure className={styles.figure} key={e.name}>
              {/* Si no hay imagen carga imagen-default*/}
              {e.imagen ? (
                <img
                  className={styles.img}
                  src={e.imagen}
                  alt={`foto de ${e.name}`}
                />
              ) : (
                <img
                  className={styles.img}
                  src="./photo-user.png"
                  alt="photoUser"
                />
              )}

              <div className={styles.container_text}>
                <p className={styles.name}>{e.name}</p>
                <p className={styles.profession}>{e.profesion}</p>
                <p className={styles.description}>{e.descripcion}</p>
              </div>
              <div className={styles.social}>
                {e.social.linkedin.length > 0 ? (
                  <a href={e.social.linkedin} target="_black">
                    <FaLinkedin
                      size={30}
                      color="black"
                      style={{ marginRight: '4rem' }}
                    />
                  </a>
                ) : (
                  ''
                )}

                {/* Si hay link de github se coloca el icono */}
                {e.social.github.length > 0 ? (
                  <a href={e.social.github} target="_black">
                    <FaGithub size={30} color="black" />
                  </a>
                ) : (
                  ''
                )}
              </div>
            </figure> // fin card
          ))}
          {/* Boton "to top" */}
          <ScrollToTop
            smooth
            style={{
              backgroundColor: 'white',
              padding: '.5rem',
              border: 'none',
              bottom: '10rem',
            }}
          />
        </section>
      </div>
    </>
  );
}
