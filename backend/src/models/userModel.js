import mongoose from "mongoose";



// const userSchema = new mongoose.Schema(
//   {
//     image: { type: String, required: false },
//     name: { type: String, required: true },
//     lastname: { type: String, required: true },
//     bio:{type: String,required:false},
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     birthDate: { type: Date, required: false },
//     password: { type: String, required: true },
//     isLogin: { type: Boolean, default: false },
//     isAdmin: { type: Boolean, default: false },
//     isVerified: { type: Boolean, default: false },
//     toRead: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
//     addFavorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
//     addreaded: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }]
//     , 
//   },
//   { collection: "Users", timestamps: true }
// );

// const user = new mongoose.model("user",userSchema) || mongoose.models.user
// export default user



const userSchema = new mongoose.Schema(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    bio: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: false },
    password: { type: String, required: true },
    isLogin: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    toRead: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    addFavorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    addreaded: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }] 
  },
  { collection: "Users", timestamps: true }
);

const user = mongoose.model("user", userSchema);
export default user;
