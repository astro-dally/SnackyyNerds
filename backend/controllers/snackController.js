import snackModel from "../models/snackmodel.js";
import fs from 'fs'

//add snack item
const addSnack = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const snack = new snackModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try {
        await snack.save();
        res.json({ success: true, message: "Snack Added" })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" })
    }
}


//All snacks list
const listSnack = async (req, res) => {
    try {
        const snacks = await snackModel.find({});
        res.json({ success: true, data: snacks })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" })
    }
}

//remove snack item
const removeSnack = async (req, res) => {
    try {
        const snack = await snackModel.findById(req.body.id);
        fs.unlink(`uploads/${snack.image}`, () => { })

        await snackModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Snack Removed" })

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" })
    }

}

export { addSnack, listSnack, removeSnack }