import mongoose from "mongoose";



const verificationOTPSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, require: true},
    "OTP": {type: String, require: true},
    createdAt: { type: Date, expires: '5m', default: Date.now}
});

const verificationOTP = new mongoose.model("verificationOTP", verificationOTPSchema);


export default verificationOTP;

