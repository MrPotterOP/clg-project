import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, require: true},
    name: {type: String, min: 4, require: true, unique: true}
});

const institute = new mongoose.model("institute", instituteSchema);

export default institute;