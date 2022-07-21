// @ts-check
const express = require("express");
const router = express.Router();
const { fs } = require("../utils/database/firebase");

/**
 *
 */
router.post("/create", async (req, res, next) => {
  try {
    if (!req.body) {
      throw new Error("No Payload Provided");
    }

    if (!req.body.uid) {
      throw new Error("No User ID Provided");
    }

    if (!req.body.provider || req.body.provider === "unknown") {
      throw new Error("No Git Provider");
    }

    const {
      provider,
      uid,
      github = {},
      photoURL = "",
      displayName = "",
    } = req.body;

    const profileData = {
      uid,
      provider,
      github,
      profile: {
        photoURL,
        displayName,
      },
    };

    await fs.collection("users").doc(uid).set(profileData);

    res.status(200);
    res.json({
      status: "ok",
      statusText: "Package Saved.",
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
