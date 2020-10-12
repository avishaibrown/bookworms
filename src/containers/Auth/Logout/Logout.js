import React, { useEffect, useCallback } from "react";
import * as actions from "../../../store/actions";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";

const Logout = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch]);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to={"/auth"} />;
};

export default Logout;
