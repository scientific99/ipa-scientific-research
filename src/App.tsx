import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Translate from "./components/Translate";
import Header from "./components/Header";
import Document from "./components/Document";
import { Feedback, FeedbackTable } from "./components/Feedback"
import About from "./components/About";
import SidebarMenu from "./components/SidebarMenu";
import Login from "./components/auth/Login";
import { AuthProvider } from "./components/auth/AuthContext"

const sidebarDefaultWidth = "270px"
const sidebarCollapsedWidth = "80px"


const App: FC = () => {
  const [toggled, setToggled] = useState(window.innerWidth <= 767);
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 767);
  const [sidebarWidth, setSidebarWidth] = useState(sidebarDefaultWidth);
  const [activeKey, setActiveKey] = useState("/home")

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setToggled(true);
        setCollapsed(true);
      } else {
        setToggled(false);
        setCollapsed(false);
      }
    };

    // Gắn sự kiện lắng nghe sự thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="home-main">
          <SidebarMenu
            collapsed={collapsed}
            handleCollapsed={handleCollapsed}
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            toggled={toggled}
            setToggled={setToggled}
          />
          <div
            className="flex w-full h-full relative justify-c mx-auto"
            style={toggled ? { marginLeft: sidebarCollapsedWidth } : { marginLeft: sidebarWidth }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/document" element={<Document />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/feedback/list" element={<FeedbackTable />} />
              <Route path="/translate" element={<Translate />} />
              <Route path="/admin/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
