import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import user from "../models/user.js";

dotenv.config();

const verifyUser = (req, res, next) =>{


    if(req.headers){
        if(!req.headers.authorization){
            return res.status(401).json({"msg": "Unauthorized Access."});
        }

        const token = req.headers.authorization;

        jwt.verify(token.slice(7, token.length), process.env.JWTSECKEY, (err, payload)=>{
            if(err){
                return res.status(401).json({"msg": "Unauthorized Access."});
            }
            
            if(payload){
                
                if(!payload.id || !payload.email || !payload.name){
                    return res.status(401).json({"msg": "Unauthorized Accesss."});
                }else{
                    req.user = {_id: payload.id, email: payload.email, name: payload.name};
                    next();
                }
            }
        });
    }else{
        return res.status(401).json({"msg": "Unauthorized Access.."});
    }
    
}

export default verifyUser;