import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { sidebarConfig } from "./common/types/constants/SidebarConfig";
import { ToggleType } from "./common/types/interface/Layouts.interface";
import RequireAuth from "./view/common/authantications/RequireAuth";
import Header from "./view/layouts/header/Header";
import Sidebar from "./view/layouts/sidebar/Sidebar";
import Login from "./view/pages/login-pages/Login";
const NotFound = () => <h1>Page Not Found</h1>;

const App = () => {
  const [openDropdowns, setOpenDropdowns] = useState<ToggleType>({});
  const [collapse, setCollapse] = useState(false);

  // Function to toggle dropdowns in the sidebar
  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <Router>
      <Routes>
        <Route key={"login"} path={"/login"} element={<Login />} />
      </Routes>
      <RequireAuth>
        <div className="app-layout">
          {/* Header */}
          <Header />

          {/* Sidebar and Main Content */}
          <div className={`app-body ${collapse ? "aside-mini-mode" : ""}`}>
            {/* Sidebar */}
            <Sidebar
              collapse={collapse}
              setCollapse={setCollapse}
              config={sidebarConfig}
              openDropdowns={openDropdowns}
              toggleDropdown={toggleDropdown}
            />

            {/* Main Content */}
            <main id="dashboard" className={`app-content`}>
              <Routes>
                {/* <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login/fail" element={<LoginFailed />} /> */}
                <Route
                  path="*"
                  element={
                    <Routes>
                      {sidebarConfig.map((route) => {
                        if (route.children) {
                          return route.children.map((child) => (
                            <Route
                              key={child.path}
                              path={child.path}
                              element={<child.component />}
                            />
                          ));
                        } else {
                          return (
                            <Route
                              key={route.path}
                              path={route.path}
                              element={
                                route.component ? <route.component /> : null
                              }
                            />
                          );
                        }
                      })}
                    </Routes>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </RequireAuth>
    </Router>
  );
};

export default App;
