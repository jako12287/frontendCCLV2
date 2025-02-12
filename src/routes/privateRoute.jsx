import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
