import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "./views/Dashboard/Dashboard";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
