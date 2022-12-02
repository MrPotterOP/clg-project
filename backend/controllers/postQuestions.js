import queset from "../models/queset.js";
import dotenv from "dotenv";
dotenv.config();

const postQuestions = (req, res) =>{
    const {secKey, data} = req.body;
    if(secKey === process.env.SERVERKEY){
        if(data){
            queset.insertMany([...data], (err, success)=>{
                if(err){
                    return res.ststus(402).json({msg: "unidentified data."});
                }else {
                    return res.json({msg: "questions added to db."});
                }
            })
        }else{
            return res.ststus(403).json({msg: "data missing."});
        }
    }else{
        return res.ststus(401).json({msg: "unuthorized access."});
    }
}

export default postQuestions;