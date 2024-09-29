import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu(props) {
  let data = localStorage.getItem('menuUser');
  let dataMenu = data ? JSON.parse(data) : [];

  const renderSubMenu = (menu) => {
    return (
      <NavDropdown title={menu.nombreMenu} id={`dropdown-${menu.id}`}>
        {menu.menuHijo && menu.menuHijo.map((subMenu, index) => (
          <NavDropdown.Item key={index} as={Link} to={subMenu.url}>
            {subMenu.nombreMenu}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
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
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(Menu);