import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Home from "./screens/Home";
import Translate from "./components/Translate";
import Header from "./components/Header";
import Document from "./components/Document";
import Feedback from "./components/Feedback"
import About from "./components/About";
import SidebarMenu from "./components/SidebarMenu";
import "./fade.css"

const sidebarDefaultWidth = "270px"
const sidebarCollapsedWidth = "80px"

const App: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(sidebarDefaultWidth);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  }
  // const location = useLocation();
  const locationKey = window.location.pathname;

  return (
    <Router>
      <div className="home-main">
        <SidebarMenu
          collapsed={collapsed}
          handleCollapsed={handleCollapsed}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
        />
        <div
          className="flex w-screen h-full relative justify-c"
          style={{ marginLeft: sidebarWidth }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/document" element={<Document />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/translate" element={<Translate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
