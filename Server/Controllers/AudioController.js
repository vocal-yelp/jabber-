const firebase = require("firebase");
// const storage = require('firebase/storage')
// const firebase = require('../../src/components/firebase/index')

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
});

// const firestorage = firebase.storage();

module.exports = {
  sendBlob: (req, res) => {
    const { name, uid, URL } = req.body;
    console.log(req.body.blobURL);
    firebase
      .firestore()
      .collection("audio/")
      .add({ name, uid, URL })
      .then(res => {
        console.log("this:", res);
      });
  }
};
