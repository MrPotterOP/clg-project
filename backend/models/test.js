import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: {type: String, required: true, min: 4, max:50},
    description: {type: String, required: true, min: 4, max:250},
    duration: {type: Number, required: true},
    date:{
        day: {type: Number, required: true},
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        time: {hour:{type: Number, required: true}, min:{type: Number, required: true}} 
    },
    questions:[{type: String, required: true}],
    institute: {type: String, required: true}
});


const test = new mongoose.model("test", testSchema);

export default test;