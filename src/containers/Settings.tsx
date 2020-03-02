import React, { useState } from "react";
import { API } from "aws-amplify";

export default function Settings(props: any) {
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details: any) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  return <div className="Settings">Settings</div>;
}
