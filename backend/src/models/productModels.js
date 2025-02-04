import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    description:{
        type: String,
        require: true
    },
})

const product = new mongoose.model("product", productSchema) || mongoose.models.product
export default product