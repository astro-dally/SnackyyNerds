import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://astro:astro%23mongo64@cluster0.axovo.mongodb.net/snackynerds")
        .then(() => console.log("DB Connected"))
        .catch((err) => console.error("DB connection error:", err));
};
