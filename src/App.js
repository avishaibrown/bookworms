import React, { Suspense, useCallback, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";

const Bookshelf = React.lazy(() => {
  return import("./containers/Bookshelf/Bookshelf");
});

const Matches = React.lazy(() => {
  return import("./containers/Matches/Matches");
});

const Profile = React.lazy(() => {
  return import("./containers/Profile/Profile");
});

const Logout = React.lazy(() => {
  return import("./containers/Auth/Logout/Logout");
});

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  const onTryAutoSignUp = useCallback(
    () => dispatch(actions.checkAuthState()),
    [dispatch]
  );

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/matches" render={(props) => <Matches {...props} />} />
        <Route path="/profile" render={(props) => <Profile {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/bookshelf" exact component={Bookshelf} />
        <Redirect to="/bookshelf" />
      </Switch>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
