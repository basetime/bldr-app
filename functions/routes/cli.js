// @ts-check
const express = require("express");
const router = express.Router();
const utils = require("../utils/index");
// const axios = require("axios").default;

// const utils = require("../utils/index");

/**
 * Request for all package docs
 */
router.get("/", async (req, res) => {
  try {
    const data = {};

    res.status(200);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json({
      status: "error",
      statusText: err.message,
    });
  }
});

/**
 *
 */
router.post("/increment/:metric", async (req, res, next) => {
  try {
    const data = {};
    const count = req.body?.count || 1;
    await utils.incrementMetaDataCount(req.params.metric, count);

    res.status(200);
    res.json(data);
  } catch (err) {
    err.message;

    const message = err && err.response && err.response.statusText;
    const statusText =
      message === "Not Found" ?
        "Repository cannot be found or may be private." :
        err.message;

    next({
      status: "error",
      statusCode: 400,
      statusText,
    });
  }
});


router.get("/oauth/code", async (req, res) => {
  try {
    // const data = {
    //   reqURL: req.query.code,
    // };
    res.writeHead(302, { "Location": `http://127.00.00.1:3000/oauth/?code=${req.query.code}` });
    // await axios.post("http://127.00.00.1:3000/oauth", data);

    res.status(200);
    res.end();
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json({
      status: "error",
      statusText: err.message,
    });
  }
});

module.exports = router;
