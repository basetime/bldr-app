// @ts-nocheck

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { requireAuth } = require("../middleware/auth");
// const { isAdminOrOwner } = require("../middleware/admin");

// const adminRoute = require("../routes/admin");
// const sysAdminRoute = require("../routes/sysadmin");
// const syncRoute = require("../routes/sync");
// const insightRoute = require("../routes/insight");
const authenticationRoute = require("../routes/authentication");
const packageRoute = require("../routes/package");
const userRoute = require("../routes/user");
const cli = require("../routes/cli");

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/v1/authentication", authenticationRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/package", packageRoute);
app.use("/api/v1/cli", cli);

// app.use("/api/v1/sysadmin", isAdminOrOwner, sysAdminRoute);
// app.use("/api/v1/admin", requireAuth, adminRoute);
// app.use("/api/v1/sync", requireAuth, syncRoute);
// app.use("/api/v1/insight", requireAuth, insightRoute);

/**
 * Catch all Unkown Requests
 */
app.use("*", (req, res, next) => {
  next({
    status: "error",
    statusCode: 404,
    statusText: `${req.originalUrl} not found`,
  });
});

/**
 * Catch all Errors
 */
app.use((err, req, res, next) => {
  console.log("Handler Error Catch");
  res.json(err);
  res.end();
  next();
});

module.exports = app;
