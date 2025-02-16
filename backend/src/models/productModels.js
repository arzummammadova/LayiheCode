// import mongoose from "mongoose";


// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     image: {
//         type: String,
//         require: true
//     },
//     price:{
//         type: Number,
//         require: true
//     },
//     description:{
//         type: String,
//         require: true
//     },
//     category:{
//         type: String,
//         require: true
//     },
//     author: {
//         type: String,
//         required: true
//     },
//     genre: {
//         type: String,
//         required: true
//     },
//     publishedDate: {
//         type: Date,
//         required: true
//     },
//     lang:{
//         type:String,
//         required:false,
//     },
//     reviews: [
//         {
//             user: {
//                 type: String,
//                 required: false
//             },
//             rating: {
//                 type: Number,   
//                 min: 1,
//                 max: 5,
//                 required: false
//             },
//             comment: {
//                 type: String,
//                 required:false
//             },
//             createdAt: {
//                 type: Date,
//                 default: Date.now
//             }
//         }]

// })

// const product = new mongoose.model("product", productSchema) || mongoose.models.product
// export default product



import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  // Burada `Users` kolleksiyasına referans veririk
        required: true
    },
   
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    lang: { type: String, required: false },
    reviews: [reviewSchema]  // Ayrı `reviewSchema` yaratdıq ki, daha strukturlaşmış olsun.
});

const product = mongoose.model("product", productSchema);
export default product;
