import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
function Header() {
  const location = useLocation().pathname;

  return (
    <Navbar expand="md">
      <Container>
        <Nav.Link href="/" className="logo">
          <img src={logo} alt="logo" />
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link className={location === "/" && "active"} href="/">
              Home
            </Nav.Link>
            <Nav.Link
              className={location === "/recipes" && "active"}
              href="/recipes"
            >
              Recipes
            </Nav.Link>
            <Nav.Link
              className={location === "/favorites" && "active"}
              href="/favorites"
            >
              Favorites
            </Nav.Link>
            <Nav.Link
              className={location === "/contact" && "active"}
              href="/contact"
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
