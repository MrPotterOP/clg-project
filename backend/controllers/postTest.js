import test from "../models/test.js";
import queset from "../models/queset.js";



const postTest = (req, res)=>{
    const {_id, verified, institute} = req.user;
    const {name, description, duration, date, time, questions} = req.body;


    const addQueset = (id)=>{

        const deleteTest = ()=>{
            test.findOneAndDelete({_id: id}, (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
        }

        queset.create({_id: id, questions}, (err, doc)=>{
            if(err){
                deleteTest();
                return res.status(501).json({msg: "something went wrong."})
            }else if(!doc){
                deleteTest();
                return res.status(401).json({msg: "Provide Valid Information."});
            }else{
                return res.status(200).json({msg: "Test Sheduled."})
            }
        })
    }

    const createTest = ()=>{
        const scheduleData = {
            institute: _id, name, description, duration, date, time
        }

        test.create({...scheduleData}, (err, doc)=>{
            if(err){
                return res.status(501).json({msg: "something went wrong"})
            }else if(!doc){
                return res.status(401).json({msg: "Provide Valid Information."});
            }else{
                addQueset(doc._id);
            }
        });
    }


    if(!verified){
        return res.status(403).json({msg: "Unverified User."});
    }else if(institute != "null"){
        return res.status(403).json({msg: "User does not have permission to create test."});
    }else{

        if(!name || !description || !duration || !date || !time ||!questions){
            return res.status(401).json({msg: "Provide Valid Data"});
        }else{
            createTest();

        }

    }
}

export default postTest;