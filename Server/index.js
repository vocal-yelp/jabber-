require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const { SERVER_PORT } = process.env;

const {
  sendUserInfo,
  loadJabs,
  loadUserJabs,
  deleteJab
} = require("./Controllers/AudioController");

app.post("/api/sendUserInfo", sendUserInfo);
app.get("/api/loadJabs", loadJabs);
app.get("/api/loadUserJabs/:id", loadUserJabs);
<<<<<<< HEAD
app.delete("/api/deleteJab/:id", deleteJab);
=======
app.delete("/api/deleteJab/", deleteJab);
>>>>>>> master

app.listen(SERVER_PORT, () => {
  console.log(`tuning in to ${SERVER_PORT}`);
});
