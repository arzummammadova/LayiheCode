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
    category:{
        type: String,
        require: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    lang:{
        type:String,
        required:false,
    },
    reviews: [
        {
            user: {
                type: String,
                required: false
            },
            rating: {
                type: Number,   
                min: 1,
                max: 5,
                required: false
            },
            comment: {
                type: String,
                required:false
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]

})

const product = new mongoose.model("product", productSchema) || mongoose.models.product
export default product