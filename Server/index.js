require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const { SERVER_PORT } = process.env;

const { sendUserJabandInfo, loadJabs, loadUserJabs, deleteJab } = require("./Controllers/AudioController");

/////////////// Audio //////////////////////////
app.post("/api/sendUserJabandInfo", sendUserJabandInfo);
app.get('/api/loadJabs', loadJabs);
app.get('/api/loadUserJabs/:id', loadUserJabs);
app.delete("/api/deleteJab/:id", deleteJab)

app.listen(SERVER_PORT, () => {
  console.log(`tuning in to ${SERVER_PORT}`);
});
