const functions = require("firebase-functions");

// const dotenv = require("dotenv");
const handleRestApi = require("./handlers/api");

// dotenv.config({
//   path: "../.env",
// });

exports.bldrAPI = functions.https.onRequest(handleRestApi);
