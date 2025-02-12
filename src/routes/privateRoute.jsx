import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
