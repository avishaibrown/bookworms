import React from "react";
import Aux from "../Auxiliary/Auxiliary";
import PersistentDrawerLeft from "../../components/Navigation/Navigation";
import Copyright from "../../components/Copyright/Copyright";
import Box from "@material-ui/core/Box";

const Layout = (props) => {
  const { children } = props;

  return (
    <Aux>
      <PersistentDrawerLeft>
        {children}
        <Box mt={8}>
          <Copyright />
        </Box>
      </PersistentDrawerLeft>
    </Aux>
  );
};

export default Layout;
