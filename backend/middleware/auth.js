import Jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorised Login again" })


    }
    try {
        const token_decode = Jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "Error" })
    }

}

export default authMiddleware;