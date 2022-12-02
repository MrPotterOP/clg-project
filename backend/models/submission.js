import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    testId: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true},
    student: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true},
    answers: [{type: Number, required: true}],
    score: {
        right: {type: Number, required: true},
        wrong: {type: Number, required: true}
    },
    submittedAt: {type: Date, default: Date.now()}
});

const submission = new mongoose.model("submission", submissionSchema);

export default submission;