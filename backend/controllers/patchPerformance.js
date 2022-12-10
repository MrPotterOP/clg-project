import submission from "../models/submission.js";
import user from "../models/user.js";



const patchPerformance = (req, res)=>{

    const {verified, institute} = req.user;
    const {testId} = req.body;

    //Functional Components

    const genStudentsName = (students, scores) =>{
        user.find({'_id': {$in: students}}, (err, docs)=>{
            if(err){
                return res.status(400).json({msg: "Something Went Wrong, Try again after some time."});
            }else {
                const data = [];
                docs.forEach((t, i) => {
                    data.push({name: t.name, score: scores[i]});
                });

                return res.json({data});
            }
        })
    }

    const findSubmission = ()=>{
        submission.find({testId}, (err, docs)=>{
            if(err){
                return res.status(400).json({msg: "Something Went Wrong, Try again after some time."});
            }else{
                if(docs){
                    const students = [];
                    const score = [];
                    
                    docs.forEach(t => {
                       students.push(t.student);     
                       score.push(t.score);     
                    });
                    
                    genStudentsName(students, score);
                }else{
                    return res.json({data: docs});
                }
            }
        })
    }


    //Main JS
    if(!verified){
        return res.status(403).json({msg: "Unverified User."});
    }else if(institute != "null"){
        return res.status(403).json({msg: "User does not have permission to patch test."});
    }else{

        if(!testId){
            return res.status(401).json({msg: "Provide Valid Data"});
        }else{
            findSubmission();
        }
    }
}

export default patchPerformance;