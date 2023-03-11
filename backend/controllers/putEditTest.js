import test from "../models/test.js";


const putEditTest = (req, res)=>{
    const {_id, institute} = req.user;
    const {testID, update} = req.body;

    //Handlers
    const findTest = ()=>{
        test.findOneAndUpdate({_id: testID, institute: _id}, update, (err, doc)=>{
            if(err){
                return res.status(501).json({msg: "Something went wrong while fetching database, try again."});
            }else if(!doc){
                return res.status(401).json({msg: "Invalid data provided."});
            }else{
                return res.json({msg: "Test Updated Successfully."});
            }
        })
    }




    //Main JS
    if(institute === "null" && testID && update){
        findTest();
    }else{
        if(!testID || !update){
            return res.status(401).json({msg: "Invalid input provided."})
        }else{
            return res.status(401).json({msg: "Student dont have any permission to edit test."})
    }
    }
}


export default putEditTest;