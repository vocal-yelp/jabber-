require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../build`));

const { SERVER_PORT } = process.env;

const {
  sendUserInfo,
  loadJabs,
  loadUserJabs,
  deleteJab
} = require("./Controllers/AudioController");

/////////////// Audio //////////////////////////
app.post("/api/sendUserInfo", sendUserInfo);
app.get("/api/loadJabs", loadJabs);
app.get("/api/loadUserJabs/:id", loadUserJabs);
app.delete("/api/deleteJab/", deleteJab);

app.listen(SERVER_PORT, () => {
  console.log(`tuning in to ${SERVER_PORT}`);
});
