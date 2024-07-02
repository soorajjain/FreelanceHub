import express from "express";

import authApiHandler from "./src/controller/auth/apiHandler.js";
import adminApiHandler from "./src/controller/admin/apiHandler.js";
import clientsApiHandler from "./src/controller/clients/apiHandler.js";
import freelancersApiHandler from "./src/controller/freelancers/apiHandler.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/auth", authApiHandler);
  app.use("/api/clients", clientsApiHandler);
  app.use("/api/admin", adminApiHandler);
  app.use("/api/freelancers", freelancersApiHandler);
};

export default routes;
