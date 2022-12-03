import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "./views/Dashboard/Dashboard";
import Layout from "./layouts/Layout";
import Register from "./views/Register/Register";
import DetailedPlayer from "./views/DetailedPlayer/DetailedPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="player">
          <Route path=":id" element={<DetailedPlayer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
