const firebase = require("firebase");

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
});

module.exports = {
  sendUserInfo: (req, res) => {
    const { name, uid, date, URL, lat, lng, img } = req.body;
    firebase
      .firestore()
      .collection(`user/`)
      .doc(`${uid}`)
      .collection(`clips/`)
      .doc(`${date}`)
      .set({ name, uid, date, URL, lat, lng, img });
  },

  loadJabs: (req, response) => {
    const clips = [];
    firebase
      .firestore()
      .collectionGroup("clips")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          clips.push(doc.data());
        });
      })
      .then(res => response.json(clips));
  },

  loadUserJabs: (req, response) => {
    const uid = req.params.id;
    const clips = [];
    firebase
      .firestore()
      .collection("user/")
      .doc(`${uid}`)
      .collection("clips")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          clips.push(doc.data());
        });
      })
      .then(res => response.json(clips))
      .catch(err => console.log(err));
  },

  deleteJab: (req, response) => {
    const { uid, date } = req.body;
    firebase
      .firestore()
      .collection("user/")
      .doc(uid)
      .collection("clips")
      .doc(date)

      .delete()
      .then(res => {
        console.log(res, "yes");
      });
  }
};
