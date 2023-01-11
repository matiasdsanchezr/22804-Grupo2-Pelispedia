import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

import styles from '../Styles/Search.module.css';

function Search() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  // Buscador de pelicula por texto ingresado en input de form.
  const busquedaPeli = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/peliculas/search/${busqueda}`, { replace: true });
    },
    [busqueda, navigate]
  );

  // Obtiene value ingresado en input y lo settea en el estado de busqueda
  const changeHandler = useCallback(
    (e) => {
      setBusqueda(e.target.value);
      if (e.target.value === '') navigate('/peliculas/', { replace: true });
    },
    [navigate]
  );

  return (
    <div>
      <Form className={styles.searchField} onSubmit={busquedaPeli}>
        <input
          type="search"
          id="searchBar"
          className={styles.formControl}
          placeholder="Buscar películas"
          name="busqueda"
          value={busqueda}
          onChange={changeHandler}
          onReset={changeHandler}
        />
        <button type="submit" className={`${styles.icono}`}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Form>
    </div>
  );
}

export default Search;
