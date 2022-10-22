import verificationOTP from "../models/verificationOTP.js";
import bcrypt from "bcryptjs";
import sendMail from "./sendMail.js";


const postGenerateOTP = (req, res)=>{
    const {_id, email, name} = req.user;

    const genOTP = ()=>{
                    let OTP = "";
                    OTP += Math.random();
                    OTP = OTP.slice(OTP.length - 4, OTP.length);

                    bcrypt.hash(OTP, 8, (e, hash)=>{
                    if(e){
                        return res.status(501).json({msg: "Something went wrong."});
                    }
                    if(hash){
                        verificationOTP.create({OTP: hash, _id: _id});
                        sendMail(email, name, OTP);
                        return res.status(200).json({msg: "OTP Sent."});
                    }
                    }); 
    }

    verificationOTP.findOne({id: _id}, (err, doc)=>{
        if(err){
            console.log(err);
            return res.status(501).json({msg: "Something went wrong"});
        }
        if(doc){
            verificationOTP.findOneAndDelete({id: _id}, (error, result)=>{
                if(error){
                    return res.status(501).json({msg: "Something went wrong."});
                }
                if(result){
                   genOTP();
                }
            });
        }
        genOTP();
    })
}

export default postGenerateOTP;