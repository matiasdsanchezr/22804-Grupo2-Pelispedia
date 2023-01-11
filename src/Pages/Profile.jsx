import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import { useAuth } from '../Contexts/AuthContext';
import { useUserInfo } from '../Hooks/user.hooks';
import styles from '../Styles/Profile.module.css';

const Profile = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { currentUser } = useAuth();

  // Obtengo los datos del usuario
  const { data, isLoading } = useUserInfo();

  const handleOnClose = useCallback((e) => {
    e.preventDefault();
    setShowAlert(false);
  }, []);

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();
    setShowAlert(false);
  }, []);

  const showChangeEmailAlert = useCallback(() => {
    setShowAlert('CHANGE_EMAIL');
  }, []);

  const showChangePasswordAlert = useCallback(() => {
    setShowAlert('CHANGE_PASSWORD');
  }, []);

  return (
    <>
      {!isLoading && (
        // (console.log(userData),
        <div className={styles.profileContainers}>
          <h2 className={styles.title}>Perfil</h2>
          <FontAwesomeIcon icon={faCircleUser} className={styles.profileIcon} />
          <div className={styles.infoContainer}>
            <div className={styles.infoField}>
              <span className={styles.bold}>Nombre: </span>
              <span>{data.userNombre}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.bold}>Correo: </span>
              <span>{currentUser.email}</span>
            </div>
          </div>
          <button className={styles.button} onClick={showChangeEmailAlert}>
            Cambiar email
          </button>
          <button className={styles.button} onClick={showChangePasswordAlert}>
            Cambiar contraseña
          </button>

          {showAlert === 'CHANGE_EMAIL' ? (
            <EmailAlert onClose={handleOnClose} onSubmit={handleOnSubmit} />
          ) : showAlert === 'CHANGE_PASSWORD' ? (
            <PasswordAlert onClose={handleOnClose} onSubmit={handleOnSubmit} />
          ) : null}
        </div>
      )}
    </>
  );
};

const EmailAlert = ({ onClose, onSubmit }) => (
  <div className={styles.alertContainer}>
    <form className={styles.alert} onSubmit={onSubmit}>
      <div className={styles.inputGroup}>
        <span>Ingresa tu nuevo email:</span>
        <input className={styles.alertInput} type="email" />
      </div>

      <div className={styles.alertButtonsContainer}>
        <button className={styles.alertButton} onClick={onClose}>
          Cambiar
        </button>
        <button className={styles.alertButton} onClick={onClose}>
          Volver
        </button>
      </div>
    </form>
  </div>
);

EmailAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const PasswordAlert = ({ onClose, onSubmit }) => (
  <div className={styles.alertContainer}>
    <form className={styles.alert} onSubmit={onSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Ingresa tu nueva contraseña:</label>
        <input className={styles.alertInput} type="password" id="password" />
      </div>

      <div className="inputGroup">
        <label htmlFor="password">Confirma tu nueva contraseña:</label>
        <input className={styles.alertInput} type="password" />
      </div>

      <div className={styles.alertButtonsContainer}>
        <button className={styles.alertButton} onClick={onClose}>
          Cambiar
        </button>
        <button className={styles.alertButton} onClick={onClose}>
          Volver
        </button>
      </div>
    </form>
  </div>
);

PasswordAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Profile;
