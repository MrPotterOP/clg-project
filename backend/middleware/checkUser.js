import user from "../models/user.js";

const checkUser = (req, res, next)=>{
    const {_id} = req.user;

    user.findOne({_id}, (er, result)=>{
        if(er){
            return res.status(401).json({"msg": "Unauthorized Accesss."});
        }else if(result){
            req.user = {_id: result._id, email: result.email, name: result.name, verified: result.verified, institute: result.institute};
            next();
        }else{
            return res.status(401).json({"msg": "Unauthorized Accesss."});
        }
    })
}

export default checkUser;