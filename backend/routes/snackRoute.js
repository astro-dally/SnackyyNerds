import express from "express";
import { addSnack, listSnack, removeSnack } from "../controllers/snackController.js";
import multer from "multer";

const snackRouter = express.Router();
//image storage

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
//middleware
const uplaod = multer({ storage: storage });

//end-points
snackRouter.post("/add", uplaod.single("image"), addSnack);
snackRouter.get("/list", listSnack)
snackRouter.post("/remove", removeSnack)

export default snackRouter;