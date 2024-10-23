import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { useChatAppSelector } from "@store/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useChatAppSelector((store) => store.auth._id);
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  } else {
    return (
      <Navigate to="/auth/login" replace={true} state={location.pathname} />
    );
  }
};

export default ProtectedRoute;
