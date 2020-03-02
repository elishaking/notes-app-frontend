import React from "react";
import { Route } from "react-router-dom";

export default function AppliedRoute({
  component: Page,
  appProps,
  ...rest
}: any) {
  return (
    <Route {...rest} render={props => <Page {...props} {...appProps} />} />
  );
}
