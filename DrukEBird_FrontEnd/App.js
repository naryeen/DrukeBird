import * as React from "react";
import path from 'path'

import { AuthProvider } from "./context/AuthContext";
import AppNav from "./Navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      {console.log(path.join(__dirname))}
      <AppNav/>
    </AuthProvider>
  );
}
