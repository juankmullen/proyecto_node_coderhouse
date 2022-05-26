
let admin = require("firebase-admin");

let serviceAccount = require("./db/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin
