// @ts-check
const express = require("express");
const router = express.Router();

// const Admin = require("../utils/database/Admin");
// const SFMCUtils = require("../utils/sfmc");
// const requiredScopes = require("../utils/sfmc/requiredScopes");

// const { fs } = require("../utils/database/firebase");
// const { sfmcClient } = require("../utils/sfmc/api");
// const { requireRole, findDifference } = require("../middleware/auth");

// const orgAdmin = new Admin();
// const sfmc = new SFMCUtils();

// const utils = require("../utils/index");




/**
 *
 */
router.get("/authenticate", (req, res, next) => {
  try {
    console.log(`Authenticate called`);

    res.status(200);
    res.json({
      status: "ok",
    });
  } catch (err) {
    err.message;

    next({
      status: "error",
      statusCode: 400,
      statusText: err.message,
    });
  }
});

module.exports = router;
