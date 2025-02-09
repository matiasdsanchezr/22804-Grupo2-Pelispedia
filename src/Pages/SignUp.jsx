import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import authErrors from '../data/authErrors';
import styles from '../Styles/SignUp.module.css';

function SignUp() {
  const nombreUsuarioRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');

  const { signUp } = useAuth();

  const mutation = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      setError(authErrors[error.code] || error.code);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError('Las contraseñas no coinciden');

    mutation.mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      userName: nombreUsuarioRef.current.value,
    });
  };

  return (
    <form className={`${styles.form} w-xs-90 w-lg-50`} onSubmit={handleSubmit}>
      <div className={styles.signUp}>
        <h2>Registrate</h2>
      </div>
      <div className={styles.input}>
        <label htmlFor="nombreUsuario" className="form-label">
          Nombre de usuario
        </label>
        <input
          type="text"
          required
          className="form-control"
          id="nombreUsuario"
          ref={nombreUsuarioRef}
          autoComplete="on"
        />
      </div>
      <div className={styles.input}>
        {error && <h3>{error}</h3>}
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          required
          className="form-control"
          id="email"
          ref={emailRef}
          autoComplete="on"
        />
      </div>
      <div className={styles.input}>
        {}
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          required
          minLength="6"
          className="form-control"
          id="password"
          ref={passwordRef}
          autoComplete="off"
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="passwordConfirm" className="form-label">
          Confirmar contraseña
        </label>
        <input
          type="password"
          required
          minLength="6"
          className="form-control"
          id="passwordConfirm"
          ref={passwordConfirmRef}
          autoComplete="off"
        />
      </div>

      <div className={styles.btnLink}>
        <span>
          {' '}
          ¿Ya tiene una cuenta?
          <Link className={styles.signup} to="/">
            {' Ingresar'}
          </Link>
        </span>

        <button
          type="submit"
          className={styles.btn}
          disabled={mutation.isLoading}
        >
          Crear
        </button>
      </div>
    </form>
  );
}

export default SignUp;
