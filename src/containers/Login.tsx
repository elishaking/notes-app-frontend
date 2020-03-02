import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.scss";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

interface LoginProps extends RouteComponentProps {
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    Auth.signIn(email, password)
      .then(() => {
        props.userHasAuthenticated(true);
        props.history.push("/");
      })
      .catch(e => {
        alert(e.message);
        setIsLoading(false);
        setPassword("");
      });
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>

        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
