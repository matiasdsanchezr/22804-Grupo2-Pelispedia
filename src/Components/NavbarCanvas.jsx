import { useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import { useUserInfo } from '../Hooks/user.hooks';
import styles from '../Styles/Navbar.module.css';
import Search from './Search';

function OffcanvasExample() {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();

  const onClickLogout = useCallback(() => {
    signOut();
    navigate('/login');
  }, [navigate, signOut]);

  const onClickProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const { data: userInfo, isLoading } = useUserInfo();

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar variant="dark" key={expand} expand={expand} className="mb-3">
          <Container
            fluid
            className="d-flex align-items-center border-2 flex-nowrap"
          >
            {/* logo de pelispedia */}
            <Navbar.Brand className="d-flex">
              <img
                src="./logo-pelispedia.png"
                alt="Logo Pelispedia"
                height={80}
                width={80}
                className="d-inline-block align-top"
              />
              <Nav.Link href="/" className="align-self-center">
                <div className="text-white">
                  <h1>Pelispedia</h1>
                  <p className="text-white-50">
                    {' '}
                    La enciclopedia de tus películas
                  </p>
                </div>
              </Nav.Link>
            </Navbar.Brand>
            {currentUser && (
              <>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                  className={'text-white bg-opacity-75 bg-black'}
                >
                  <Offcanvas.Header closeButton className={`${styles.menu}`}>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                      className="fs-4"
                    >
                      Pelispedia : La enciclopedia de tus películas
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav
                      className={`${styles.accesos} justify-content-end flex-grow-1 me-5 `}
                    >
                      <Search />
                      <Link to="/peliculas" className={`${styles.link}`}>
                        Películas
                      </Link>
                      <Link to="/favoritos" className={`${styles.link}`}>
                        Favoritos
                      </Link>
                      <NavDropdown
                        title="Perfil"
                        className={styles.perfil}
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item
                          className={`${styles.nombre} pl-1 text-light fw-semibold text-capitalize fs-5`}
                          onClick={onClickProfile}
                        >
                          {!isLoading && userInfo.userNombre}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          onClick={onClickLogout}
                          className={`${styles.logOut} pl-1 text-light`}
                        >
                          Log out <FiLogOut />
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </>
            )}
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
