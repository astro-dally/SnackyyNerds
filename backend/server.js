import express from "express"
import cors from "cors"
// import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import snackRouter from "./routes/snackRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app_config
const app = express();
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();
//api endpoints
app.use("/api/snack", snackRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`server started on https://snackyynerdsbackend.onrender.com/${port}`)
})

//mongodb+srv://astro:astro#mongo64@cluster0.axovo.mongodb.net/?