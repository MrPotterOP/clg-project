import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    "name": {require: true, type: String, max: 20},
    "email": {require: true, type: String},
    "password": {require: true, type: String, min: 6},
    "institute": {require: true, type: String},
    "verified": {type: Boolean, default: false}
});

const user = new mongoose.model("user", userSchema);

export default user;