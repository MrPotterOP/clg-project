import mongoose from "mongoose";




const quesetSchema = new mongoose.Schema({
    question: {type: String, min: 4, max: 200, required: true},
    options: [{type: String, required: true}],
    answer: {type: Number, min: 0, max: 3, required: true},
    level: {type: String, required: true, default: "Easy"}
});

const queset = new mongoose.model("queset", quesetSchema);

export default queset;