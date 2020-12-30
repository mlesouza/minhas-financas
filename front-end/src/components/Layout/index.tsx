import React from "react";
import { Grid } from "./styles";
import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";
import { NotifyContainer } from "../../styles/global/notify";

const Layout: React.FC = ({ children }) => {
  return (
    <Grid>
      <MainHeader />
      <Aside />
      <Content> {children} </Content>
      <NotifyContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>
  );
};

export default Layout;
