import mongoose from "mongoose";

const snackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
})

const snackModel = mongoose.models.snack || mongoose.model("snack", snackSchema)

export default snackModel;