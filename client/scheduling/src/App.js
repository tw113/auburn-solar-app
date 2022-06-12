import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CreateAccount from "./pages/CreateAccount";
import NotFound from "./pages/NotFound";
import Request from "./pages/Request";
import PickDate from "./pages/PickDate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Request />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="pick-date" element={<PickDate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
