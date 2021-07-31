import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import { MoralisContext } from "../context/MoralisContext";

function Navbar(props) {
  const { moralis, user, setUser, setLoggingIn } = useContext(MoralisContext);

  useEffect(() => {}, [user]);

  const handleLogin = async () => {
    try {
      setLoggingIn(true);
      moralis.Web3.getSigningData = () =>
        "BitDiamond Authentication - Sign to use our dapps.";
      const user = await moralis.Web3.authenticate();
      setUser(user);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await moralis.User.logOut();
    setUser(undefined);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} width="35" height="35" />
              <h1 className="navbar-logo-text">
                Treasure<span>Hunt</span>
              </h1>
            </Link>
          </div>

          <button
            className="navbar-menu-toggle"
            onClick={props.handleMobileToggle}
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <div className="navbar-nav">
            <ul className="navbar-menu">
              <li>
                <NavLink exact to="/" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/mine" activeClassName="active">
                  Mine
                </NavLink>
              </li>
              <li>
                <NavLink to="/bounties" activeClassName="active">
                  Bounties
                </NavLink>
              </li>
              <li>
                <NavLink to="/trove" activeClassName="active">
                  Trove
                </NavLink>
              </li>
              <li className="navbar-menu-button">
                {!user ? (
                  <a className="button-login" onClick={handleLogin}>
                    Login
                  </a>
                ) : (
                  <a className="button-logout" onClick={handleLogout}>
                    Logout
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
