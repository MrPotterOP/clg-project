import user from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const saltRounds = 8;



const validate = (name, email, password, institute)=>{
    if(!name || !email || !password || !institute){
        return false;
    }
    return true;
    
};



const postUser = (req, res)=>{
    const {name, email, password, institute} = req.body;

    
    if(validate(name, email, password, institute)){

        user.find({email: email}, (errr, docc)=>{
            if(errr){
                return res.status(501).json({"msg": "Something Went Wrong."});
            }
            if(docc[0]){
                return res.status(401).json({"msg": "Try again with valid information."});
            }
            bcrypt.hash(password, saltRounds,  (err, hash)=>{
                if(err){
                    return res.status(501).json({"msg": "Something Went Wrong."});
                }
                if(hash){
                        user.create({name, email, password: hash, institute}, (e, d)=>{
                            if(e){
                                return res.status(401).json({"msg": "Try again with valid information."});
                            }
                            if(d){
                                jwt.sign({name: d.name, id: d._id, email: d.email}, process.env.JWTSECKEY, { expiresIn: '2d' }, (err, token)=>{
                                    if(err){
                                        return res.status(501).json({"msg": "Something Went Wrong."}); 
                                    }
                                    if(token){
                                        return res.status(200).json({"token": `Bearer ${token}`});
                                    }
                                });
                            };
                        });
                }
            });

        })

        
    }else{
         return res.status(401).json({"msg": "Try again with valid information.."});
    }

}


export default postUser;