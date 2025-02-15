import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { routes } from "../../Routes";

const Dashboard = () => {
  const [permissionObject, setPermissionObject] = useState<any>();

  return (
    <div>
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              element={route.element}
              key={`route_${route.element}`}
            />
          ))}
        </Routes>
    </div>
  );
};

export default Dashboard;
