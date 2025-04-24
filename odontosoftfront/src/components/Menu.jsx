import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import usuario from '../resource/usuario.png';

function Menu(props) {
  let data = sessionStorage.getItem('menuUser');
  let nombre = sessionStorage.getItem('nombre');
  let dataMenu = data ? JSON.parse(data) : [];

  const renderSubMenu = (menu) => {
    return (
      <NavDropdown style={{marginLeft: '20px'}} title={menu.nombreMenu} id={`dropdown-${menu.id}`}>
        {menu.menuHijo && menu.menuHijo.map((subMenu, index) => (
          subMenu.nombreMenu != 'Historia Clinica' && (
            <NavDropdown.Item key={index} as={Link} to={subMenu.url}>
              {subMenu.nombreMenu}
            </NavDropdown.Item>
          )
        ))}
      </NavDropdown>
    );
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (

    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {props.isLoggedIn && dataMenu.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.menuHijo ? renderSubMenu(menu) : (
                <Nav.Link as={Link} to={menu.url}>{menu.nombreMenu}</Nav.Link>
              )}
            </React.Fragment>
          ))}
        </Nav>
      </Navbar.Collapse>

      {props.isLoggedIn && (<Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown title={<><img src={usuario} alt="Usuario" style={{ width: '30px', marginRight: '55px' }} />{nombre}</>}  id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/restaurarcontrasenia">Restaurar Contraseña</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/login" onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>)}
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(Menu);