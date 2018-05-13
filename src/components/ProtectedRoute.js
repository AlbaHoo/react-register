import React from "react";
import { Route } from "react-router-dom";
import cloud from "../services/cloud.js";
import {Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cloud.currentUser()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
export default ProtectedRoute;
