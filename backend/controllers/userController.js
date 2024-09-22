import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const token = createToken(user._id);
        res.json({ success: true, token, cartData: user.cartData })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })
        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        // if (!validator.isStrongPassword(password)) {
        //     return res.json({ success: false, message: "Password must be at least 8 characters" }
        //     )
        // }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        //store user
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token })


    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "This is Error" })
    }
}

export { loginUser, registerUser }