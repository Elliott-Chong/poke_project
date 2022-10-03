import React from "react";
import { Redirect, Route } from "react-router";
import { useGlobalContext } from "../context";
import { RouteComponentProps } from "react-router-dom";

interface Props {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<Props> = ({ component: Component }, ...props) => {
  const {
    state: { is_authenticated, loading },
  } = useGlobalContext();
  return (
    <Route
      {...props}
      render={(props) =>
        !is_authenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
