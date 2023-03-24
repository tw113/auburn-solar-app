import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CreateAccount from "./pages/CreateAccount";
import NotFound from "./pages/NotFound";
import Request from "./pages/Request";
import Login from "./pages/Login";
import AuthContext from "./auth/auth-context";
import WorkerDashboard from "./pages/WorkerDashboard";

function App() {
  const authContext = useContext(AuthContext);

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Request />} />
          {!authContext.isLoggedIn && (<Route path="login" element={<Login />} />)}
          {!authContext.isLoggedIn && (<Route path="create-account" element={<CreateAccount />} />)}
          {authContext.isLoggedIn && (authContext.role > 0) && (<Route path="dashboard" element={<WorkerDashboard />} />)}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
