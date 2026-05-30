require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    console.log(">>> Check req.originalUrl: ", req.originalUrl);
    console.log(">>> Check authorization header: ", req.headers.authorization);
    const white_lists = ["/", "/register", "/login"];
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        console.log("req.originalUrl", req.originalUrl)
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];
            // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("check decoded", decoded);
                next();
            } catch {
                return res.status(401).json({
                    EC: -2,
                    EM: "Token không hợp lệ hoặc đã hết hạn"
                })
            }

        } else {
            return res.status(401).json({
                EC: -1,
                EM: "Không có quyền truy cập"
            })
        }
    }

}
module.exports = auth;