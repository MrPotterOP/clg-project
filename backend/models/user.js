import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    "name": {required: true, type: String, max: 20},
    "email": {required: true, type: String},
    "password": {required: true, type: String, min: 6},
    "institute": {required: true, type: String},
    "verified": {type: Boolean, default: false},
    "account": {type: String, default:"USER"}
});

const user = new mongoose.model("user", userSchema);

export default user;