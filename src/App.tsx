import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DesktopApp from "./pages/DesktopApp";
import Home from "./pages/Home";
import MobileApp from "./pages/MobileApp";
import { DESKTOP_ROUTE, HOME_ROUTE, MOBILE_ROUTE } from "./route";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={DESKTOP_ROUTE} element={<DesktopApp />} />
        <Route path={MOBILE_ROUTE} element={<MobileApp />} />
      </Routes>
    </Router>
  );
};

export default App;
