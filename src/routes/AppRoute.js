import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AlbumPage from "../pages/AlbumPage";
import BuilderPage from "../pages/BuilderPage";

const AppRoute = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/album/corner-records/tunnel" element={<AlbumPage />} />
    <Route path="/builder" element={<BuilderPage />} />
    <Route path="*" element={<>notfound</>} />
  </Routes>
);

export default AppRoute;
