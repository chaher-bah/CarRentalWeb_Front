import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useState, useEffect } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { initKeycloak, doLogin, doLogout, isAuthenticated } from "../Auth/KeycloakService.js";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    initKeycloak(() => {
      setAuthenticated(isAuthenticated());
    });
  }, []);

  const openNav = () => {
    setNav(!nav);
  };

  const handleLogin = () => {
    doLogin();
  };

  const handleLogout = () => {
    doLogout();
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <IconX width={35} height={35} />
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="mobile-navbar__buttons">
            {authenticated ? (
              <button className="navbar__buttons__logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className="navbar__buttons__sign-in" onClick={handleLogin}>
                  Sign In
                </button>
                <button className="navbar__buttons__register" onClick={handleLogin}>
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* desktop */}
        <div className="navbar">
          <Link to="/">
            <div className="navbar__img">
              <img src={Logo} alt="logo-img" />
            </div>
          </Link>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Acceuil
              </Link>
            </li>
            <li>
              <Link className="about-link" to="/about">
                A Propos
              </Link>
            </li>
            <li>
              <Link className="models-link" to="/models">
                Voitures
              </Link>
            </li>
            <li>
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
            {authenticated ? (
              <button className="navbar__buttons__logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className="navbar__buttons__sign-in" onClick={handleLogin}>
                  Sign In
                </button>
                <button className="navbar__buttons__register" onClick={handleLogin}>
                  Register
                </button>
              </>
            )}
          </div>

          {/* mobile */}
          <div className="mobile-menu" onClick={openNav}>
            <IconMenu2 width={35} height={35} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
