import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "./views/Dashboard/Dashboard";
import Layout from "./layouts/Layout";
import Register from "./views/Register/Register";
import DetailedPlayer from "./views/DetailedPlayer/DetailedPlayer";
import Compare from "./views/Compare/Compare";
import Login from "./views/Login/Login";
import ActivateUser from "./views/ActivateUser/ActivateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="compare" element={<Compare />}></Route>
        <Route path="activate-user/:token" element={<ActivateUser />}></Route>

        <Route path="player">
          <Route path=":id" element={<DetailedPlayer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
