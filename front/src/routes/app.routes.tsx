import { motion } from "framer-motion";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import RegisterInvoice from "../pages/RegisterInvoice";

const AppRoutes: React.FC = () => (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        y: { type: "tween", stiffness: 1000 },
        duration: 1,
      }}
    >
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/list/:type" exact component={List} />
        <Route
          path="/register-invoice/:type"
          exact
          component={RegisterInvoice}
        />
      </Switch>
    </motion.div>
  </Layout>
);

export default AppRoutes;
