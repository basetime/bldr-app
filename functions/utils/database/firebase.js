const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const fs = getFirestore();
fs.settings({ ignoreUndefinedProperties: true });

module.exports = {
  fs,
};
