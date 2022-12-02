import test from "../models/test.js";
import moment from "moment";
import submission from "../models/submission.js";
import queset from "../models/queset.js";


const postSubission = (req, res) =>{
    const {_id, institute, verified} = req.user;
    const {testId, answers} = req.body;

    //Functional Components

    const checkAnswers = (questions)=>{


        const genScore = (doc)=>{
            let score = {
                right: 0,
                wrong: 0
            }
            doc.forEach((t, i)=>{
                if(t === answers[i]){
                    score.right+=1;
                }else {
                    score.wrong+=1;
                }
            });

            addSubmission(score);
        }


        queset.find({
            '_id': { $in: questions}
        }, function(err, docs){
            genScore(docs);
        });
    }

    const addSubmission = (x) =>{
        const data = {testId: testId,
        student: _id,
        answers: answers,
        score: {
            right: x.right,
            wrong: x.wrong
        }};
        
        submission.create(data, (err, doc)=>{
            if(err){
                return res.status(400).json({msg: "submission not acceptable."});
            }else if(!doc){
                return res.status(400).json({msg: "submission not acceptable."});
            }else{
                return res.json({msg: "Test Submitted Successfully."});
            }
        });


    }

    const checkSubmission = (id)=>{
        // submission.find({testId}, (err, doc)=>{
        //     let checkEntry = false;
        //     if(doc){
        //         doc.forEach(t =>{
        //             if(t.student === _id){
        //                 checkEntry = true;
        //             }
        //         });
        //     }

        //     if(checkEntry){
        //         return res.status(406).json({msg: "Already Submmission is done."});
        //     }else{
        //         addSubmission(id);
        //     }
        // })
        submission.findOne({testId, student: _id}, (err, doc)=>{
            if(err){
                return res.status(400).json({msg: "Something Went Wrong."});
            }else if(!doc){
                // checkAnswers(id);
                checkAnswers(doc.questions);
            }else{
                return res.status(406).json({msg: "Already Submmission is done."});
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
                return res.status(400).json({msg: "No submissions can be done at this time."});
            }else{
                checkSubmission(doc._id);
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
                    if(doc.questions.length === answers.length){
                        checkTime(doc);
                    }else{
                        return res.status(400).json({msg: "Invalid answers data provided."})
                    }
                }else{
                    return res.status(401).json({msg:  "No permission to access this test."})
                }
            }
        })
    }

    //Main Js
    if(!verified){
        return res.status(403).json({msg: "Unverified User."});
    }else if(institute === "null"){
        return res.status(403).json({msg: "User does not have permission to patch test."});
    }else{

        if(!testID || !answers){
            return res.status(401).json({msg: "Provide Valid Data"});
        }else{
            showTest();
        }
    }
}