import institute from "../models/institute.js";


const getInstitutes = (req, res)=>{
    
    institute.find({}, (err, data)=>{
        if(err){
            return res.status(501).json({msg: "Something Went Wrong"});
        }else if(data){
            return res.status(200).json({data});
        }else {
            return res.status(401).json({msg: "Something Went Wrong"});
        }
    });
}

export default getInstitutes;