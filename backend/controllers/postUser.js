import user from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import instituteList from "../models/institute.js";

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

    const saveUser = (ins, hash)=>{
        let account;
        if(ins == "null"){
            account = "INS"
        }else{
            account = "USER"
        };

        user.create({name, email, password: hash, institute: ins, account}, (e, d)=>{
            if(e){
                return res.status(401).json({"msg": "Try again with valid information."});
            }
            if(d){
                if(account == "INS"){
                    instituteList.create({name, _id: d._id}, (errr, docc)=>{
                        if(!errr){
                            if(docc){
                                
                                jwt.sign({name: d.name, id: d._id, email: d.email}, process.env.JWTSECKEY, { expiresIn: '2d' }, (err, token)=>{
                                    if(err){
                                        return res.status(501).json({"msg": "Something Went Wrong."}); 
                                    }
                                    if(token){
                                        return res.status(200).json({"token": `Bearer ${token}`});
                                    }
                                });
                            }else{
                                return res.status(501).json({"msg": "Something Went Wrong."});
                            }
                        }else{
                            return res.status(501).json({"msg": "Something Went Wrong."});
                        }
                    })
                }else{
                    jwt.sign({name: d.name, id: d._id, email: d.email}, process.env.JWTSECKEY, { expiresIn: '2d' }, (err, token)=>{
                        if(err){
                            return res.status(501).json({"msg": "Something Went Wrong."}); 
                        }
                        if(token){
                            return res.status(200).json({"token": `Bearer ${token}`});
                        }
                    });
                }
            };
        });
    }

    const genToken = (hash)=>{
        instituteList.findOne({name: institute}, (err, doc)=>{
            if(err){
                return res.status(501).json({"msg": "Something Went Wrong."});
            }else if(doc){
                if(institute == "null"){
                    saveUser(institute, hash);
                }else{
                    saveUser(doc._id, hash);
                }
            }else if(institute == "null" && !doc){
                saveUser(institute, hash);
            }else{
                return res.status(501).json({"msg": "Something Went Wrong."});
            }
        })
    } 

    
    if(validate(name, email, password, institute)){

        user.findOne({email: email}, (errr, docc)=>{
            if(errr){
                return res.status(501).json({"msg": "Something Went Wrong."});
            }
            if(docc){
                return res.status(401).json({"msg": "Try again with valid information."});
            }
            bcrypt.hash(password, saltRounds,  (err, hash)=>{
                if(err){
                    return res.status(501).json({"msg": "Something Went Wrong."});
                }
                if(hash){
                        genToken(hash);
                }
            });

        })

        
    }else{
         return res.status(401).json({"msg": "Try again with valid information.."});
    }

}


export default postUser;