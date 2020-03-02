import React, { useState, useEffect } from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import "./App.scss";

function App(props: RouteComponentProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // calls onLoad only once to retrieve user auth status
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    props.history.push("/login");
  }

  return isAuthenticating ? (
    <h1>Authenticating...</h1>
  ) : (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ? (
              <NavItem onClick={handleLogout}>Logout</NavItem>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
