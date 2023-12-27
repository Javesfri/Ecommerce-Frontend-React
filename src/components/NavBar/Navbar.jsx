import "./NavbarStyles.css"
import { useContext } from "react";
import {AppContext} from "../../context/AppContext"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { CartWidget } from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
function NavbarSite() {
  const { user, logout} = useContext(AppContext);
  const handleLogout = () =>{
    logout()
  }
  return (
    <Navbar expand="lg" className="navbarContainer">
      <Container className="navbar">
        <Navbar.Brand className="logo" href={"/"}>
          <h1>
            Potato<span>HardStore</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link to="/">Home</Nav.Link>
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item className="NavDropDownItem">
                <Link
                  className="NavDropDownItemLink"
                  to="/products/?category=tarjetasgraficas"
                >
                  Tarjetas Graficas
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="NavDropDownItem">
                <Link
                  className="NavDropDownItemLink"
                  to="/products/?category=monitores"
                >
                  Monitores
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="NavDropDownItem">
                <Link
                  className="NavDropDownItemLink"
                  to="/products/?category=procesadores"
                >
                  Procesadores
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="NavDropDownItem">
                <Link
                  className="NavDropDownItemLink"
                  to="/products/?category=memorias"
                >
                  Memorias Ram
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="NavDropDownItem">
                <Link
                  className="NavDropDownItemLink"
                  to="/products/?category=perifericos"
                >
                  Perifericos
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="NavDropDownItem">
                <Link
                  className="NavDropDownItemLink"
                  to="/products/?all=true"
                >
                  +Productos
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navBarr">
            <SearchBar></SearchBar>
            <RxDividerVertical style={{ fontSize: "40px", color: "white" }} />
            <NavDropdown
              title={<BsPerson style={{ fontSize: "25px", color: "white" }} />}
              id="basic-nav-dropdown"
            >
              {user ? (
                <>
                  <NavDropdown.Item className="NavDropDownItem">
                    <Link
                      className="NavDropDownItemLink"
                      to="/account/profile"
                    >
                      Mi Perfil
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                    <button className="ButtonLogOut" onClick={handleLogout}>Salir</button>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item className="NavDropDownItem">
                    <Link
                      className="NavDropDownItemLink"
                      to="/account/login"
                    >
                      Iniciar Sesion
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="NavDropDownItem">
                    <Link
                      className="NavDropDownItemLink"
                      to="/account/register"
                    >
                     Registrarse
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            { user ? <Link className="link" to={"/cart"}><CartWidget/></Link>: null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarSite;