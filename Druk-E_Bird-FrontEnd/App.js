import * as React from "react";


import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./AppNavigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}
