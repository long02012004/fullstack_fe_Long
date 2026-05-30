require('dotenv').config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;


const createUserSrvice = async (name, email, password) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return {
            EC: 1,
            EM: "Email đã tồn tại ",
        }
    }
    // Hash password
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
const handleLoginService = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatchPassWord = bcrypt.compareSync(password, user.password);
            if (!isMatchPassWord) {
                return {
                    EC: 2,
                    EM: "Mật khẩu không đúng, vui lòng nhập lại",
                }
            } else {
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRE });
                return {
                    EC: 0,
                    EM: "Đăng nhập thành công",
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                }
            }
        } else {
            return {
                EC: 1,
                EM: "Email không tồn tại"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}
const getUserService = async () => {
    try {
        // k bao gồm mật khẩu
        const user = await User.find({}).select("-password");
        return {
            EC: 0,
            EM: "Lấy danh sách user thành công",
            data: user
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createUserSrvice,
    handleLoginService,
    getUserService
}