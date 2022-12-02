import test from "../models/test.js";
import queset from "../models/queset.js";
import moment from "moment";


const patchTest = (req, res)=>{
    
    const {verified, institute} = req.user;
    const {testID} = req.body;

    //Functional Components

    const findQuestions = (list)=>{

        queset.find({
            '_id': {$in: list}
        }, (err, doc)=>{
            if(err){
                return res.status(400).json({msg: "Cannot Find Questions."});
            }else if(!doc){
                return res.status(400).json({msg: "Cannot Find Questions."});
            }else{
    
                let qList = [];
                doc.forEach((t)=>{
                    qList.push({question: t.question, options: t.options, id: t._id});
                });
                res.json({list: qList, testID});
            }
        })
    }

    const checkTime = (doc)=>{
                const today = moment();
                const someday = moment([doc.date.year, doc.date.month - 1, doc.date.day, doc.date.time.hour, doc.date.time.min, 0, 0]);
                

                const diff = someday.diff(today, 'days');

                if(diff !=0){
                    return res.status(400).json({msg: "Test Not Started Yet."});
                }else{
                    const timeDiff = today.diff(someday, "minutes");

                    if(timeDiff < 0 || timeDiff >= doc.duration){
                        return res.status(400).json({msg: "Test Can not be accessed at this time."});
                    }else{
                        findQuestions(doc.questions);
                    }
                }
    }

    const showTest = ()=>{
        test.findOne({_id: testID}, (err, doc)=>{
            if(err){
                return res.status(400).json({msg: "Test Not Found."});
            }else if(!doc){
                return res.status(400).json({msg: "Test Not Found."});
            }else{
                if(doc.institute === institute){
                    checkTime(doc);
                }else{
                    return res.status(401).json({msg:  "No permission to access this test."})
                }
            }
        })
    }

    //Main JS
    if(!verified){
        return res.status(403).json({msg: "Unverified User."});
    }else if(institute === "null"){
        return res.status(403).json({msg: "User does not have permission to patch test."});
    }else{

        if(!testID){
            return res.status(401).json({msg: "Provide Valid Data"});
        }else{
            showTest();
        }
    }
}

export default patchTest;