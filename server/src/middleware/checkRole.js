import { RESPONSE } from "../config/global.js";

const checkRole = (req, res, next) => {
  let response;
  if (req.user && req.user.role === "client") {
    next(); // Allow access to the route
  } else {
    response = RESPONSE.UNAUTH_ACCESS;
    return res.json({
      code: response.code,
      msg: response.msg,
    });
  }
};

export default checkRole;
