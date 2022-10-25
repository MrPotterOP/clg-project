import mongoose from "mongoose";




const quesetSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    questions: [{
        question: {type: String, min: 4, max: 200, required: true},
        options: [{type: String, required: true}],
        answer: {type: Number, min: 1, max: 4, required: true}
    }]
});

const queset = new mongoose.model("queset", quesetSchema);

export default queset;