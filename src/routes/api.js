const express = require("express");
const routerAPI = express.Router();
const { createUser, handleLogin, getUser } = require("../controllers/userController");
const auth = require("../middleware/auth");

routerAPI.all("*", auth)
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/users", getUser);
module.exports = routerAPI; //export default
