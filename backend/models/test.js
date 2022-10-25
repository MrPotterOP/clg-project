import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: {type: String, required: true, min: 4, max:50},
    description: {type: String, required: true, min: 4, max:250},
    duration: {type: Number, required: true},
    date:{type: String, required: true},
    time:{type: String, required: true},
    institute: {type: String, required: true}
});


const test = new mongoose.model("test", testSchema);

export default test;