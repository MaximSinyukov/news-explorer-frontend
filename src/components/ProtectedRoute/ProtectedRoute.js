import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  React.useEffect(() => {
    if(!props.loggedIn) {
      props.onLogin();
    }
  }, [props.loggedIn]);

  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
)}

export default ProtectedRoute;
