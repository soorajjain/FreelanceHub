import express from "express";

import authApiHandler from "./src/controller/auth/apiHandler.js";
import adminApiHandler from "./src/controller/admin/apiHandler.js";
import clientsApiHandler from "./src/controller/clients/apiHandler.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/auth", authApiHandler);
  app.use("/api/clients", clientsApiHandler);
  app.use("/api/admin", adminApiHandler);
};

export default routes;
