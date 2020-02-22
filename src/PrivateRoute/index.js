import React from 'react';

import {
  Route,
  Redirect
} from "react-router-dom";

function PrivateRoute({ children, usuario, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        usuario._id ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;
