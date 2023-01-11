import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAuth } from '../Contexts/AuthContext';
import authErrors from '../data/authErrors';
import styles from '../Styles/LoginHelp.module.css';

const LoginHelp = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState();

  // Hook que nos ayuda a manejar los estados de la petición(success, error or pending)
  const mutation = useMutation({
    mutationFn: resetPassword,
    onError: (error) => setError(authErrors[error.code] || error.code),
    onSuccess: () => {
      Swal.fire({
        title: 'Cambio de contraseña',
        html: 'Se envio un correo para recuperar la cuenta',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    },
  });

  // Captura los datos ingresados en el form y los settea a las const de email y password
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({
      email: emailRef.current.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h2 className={styles.title}>Inicia Sesión</h2>
      {error && <p>{error}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          ref={emailRef}
          className="form-control"
          required
          id="email"
        />
      </div>
      <button
        type="submit"
        className={styles.btn}
        disabled={mutation.isLoading}
      >
        Cambiar
      </button>
      <Link className={styles.loginLink} to="/login">
        {'Volver'}
      </Link>
    </form>
  );
};

export default LoginHelp;
