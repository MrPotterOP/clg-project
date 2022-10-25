import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const postLogin = (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(401).json({msg: "Invalid Information."});
    }
    user.findOne({email}, (err, doc)=>{
        if(!err){
            if(!doc){
                return res.status(401).json({msg: "Invalid Information."});
            }else{
                bcrypt.compare(password, doc.password, (e, result)=>{
                    if(!e){
                        if(!result){
                            return res.status(401).json({msg: "Invalid Information."});
                        }else{
                            jwt.sign({name: doc.name, id: doc._id, email: doc.email}, process.env.JWTSECKEY, { expiresIn: '2d' }, (error, token)=>{
                                if(!err){
                                    if(!token){
                                        return res.status(501).json({msg: "Something Went Wrong."});
                                    }else {
                                        res.status(200).json({token: `Bearer ${token}`});
                                    }
                                }else {
                                    return res.status(501).json({msg: "Something Went Wrong."});
                                }
                            });
                        }
                    }else {
                        return res.status(501).json({msg: "Something Went Wrong."});
                    }
                });
            }
        }else{
            return res.status(501).json({msg: "Something Went Wrong."});
        }
    });
}

export default postLogin;