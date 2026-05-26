const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createUserSrvice = async (name, email, password) => {
    const hashPassword = bcrypt.hashSync(password, saltRounds)
     try {
         let result = await User.create({
             name: name,
             email: email,
             password: hashPassword,
             role: "Customer",
             
         })
         return result;

     } catch (error) {
         console.log(error);
         return null;
     }
}





module.exports = {
    createUserSrvice
}