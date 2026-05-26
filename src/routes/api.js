const express = require("express");
const routerAPI = express.Router();
const { createUser } = require("../controllers/userController");


routerAPI.post("/register", createUser);
module.exports = routerAPI; //export default
