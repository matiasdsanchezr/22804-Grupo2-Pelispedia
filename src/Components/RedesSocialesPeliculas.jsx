import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useSocialMedia } from '../Hooks/movies.hooks';
import styles from '../Styles/RedesSocialesPeliculas.module.css';
import { Loader } from './Loader';

export default function TrailerPelicula() {
  const { idPelicula } = useParams();

  // Renderiza cada vez que se actualiza el id de pelicula para obtener las redes sociales de la misma
  const { data: socialMedia, isLoading } = useSocialMedia(idPelicula);

  if (isLoading) return <Loader />;

  if (!socialMedia) return null;

  return (
    <div className={styles.container}>
      {socialMedia.social && <p>Visita sus redes:</p>}
      {socialMedia.instagram_id != null && (
        <a
          href={`https://www.instagram.com/${socialMedia.instagram_id}`}
          rel="noreferrer"
          target="_blank"
          title="ver instagram"
        >
          <FaInstagramSquare size={30} style={{ color: '#A8A4CE' }} />
        </a>
      )}
      {socialMedia.facebook_id != null && (
        <a
          href={`https://www.facebook.com/${socialMedia.facebook_id}`}
          rel="noreferrer"
          target="_blank"
          title="ver facebook"
        >
          <FaFacebookSquare size={30} style={{ color: '#A8A4CE' }} />
        </a>
      )}
      {socialMedia.twitter_id != null && (
        <a
          href={`https://twitter.com/${socialMedia.twitter_id}`}
          rel="noreferrer"
          target="_blank"
          title="ver twitter"
        >
          <FaTwitterSquare size={30} style={{ color: '#A8A4CE' }} />
        </a>
      )}
    </div>
  );
}
