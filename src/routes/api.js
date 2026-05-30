const express = require("express");
const routerAPI = express.Router();
const { createUser, handleLogin, getUser } = require("../controllers/userController");

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/users", getUser);
module.exports = routerAPI; //export default
