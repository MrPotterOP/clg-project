import bcrypt from "bcryptjs";
import verificationOTP from "../models/verificationOTP.js";
import user from "../models/user.js";

const postVerificationOTP = (req, res)=>{
    const {_id} = req.user;
    const {otp} = req.body;

    console.log(otp);

    verificationOTP.findOne({_id}, (err, doc)=>{
        if(!err){
            if(!doc){
                return res.status(501).json({msg: "OTP Expired."});
            }else {
                

                bcrypt.compare(otp, doc.OTP, (e, d)=>{
                    if(!e){
                        if(!d){
                            return res.status(501).json({msg: "Wrong OTP. Verification Failed."});
                        }else{
                            user.findOneAndUpdate({_id}, {verified: true}, (error, result)=>{
                                if(!error){
                                    return res.status(200).json({msg: "Verified."})
                                }else{
                                    return res.status(501).json({msg: "Something Went Wrong."});
                                }
                            })
                        }
                    }else{
                        return res.status(501).json({msg: "Invalid Information"});
                    }
                })
            }
        }else {
            return res.status(501).json({msg: "Something Went Wrong."});
        }
    })
}

export default postVerificationOTP;