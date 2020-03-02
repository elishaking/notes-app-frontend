import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.scss";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../utils/hooks";

interface LoginProps extends RouteComponentProps {
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    Auth.signIn(fields.email, fields.password)
      .then(() => {
        props.userHasAuthenticated(true);
        props.history.push("/");
      })
      .catch(e => {
        alert(e.message);
        setIsLoading(false);
        // setPassword("");
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
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
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
