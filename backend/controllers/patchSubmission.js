import submission from "../models/submission.js";
import queset from "../models/queset.js";
import test from "../models/test.js";
import moment from "moment";


const patchSubmission = (req, res)=>{
    const {verified, institute, _id} = req.user;
    const {submissionId} = req.body;


    //Functional Components

    const genData = (subData, testData) =>{
        queset.find({'_id': {$in: testData.questions}}, (err, doc)=> {
            if(err || !doc){
                return res.status(400).json({msg: "Invalid Submissions Entry Detected."});
            }else{
                const data = [];
                doc.forEach((t, i) => {
                    const userAnswer = t.options[subData.answers[i]];
                    const correctAnswer = t.options[t.answer];
                    const correct = (userAnswer === correctAnswer) ? true : false;
                   data.push({question: t.question, userAnswer, correctAnswer, correct});
                });

                return res.json({data, score: subData.score});
            }
        })

    }

    const checkTime = (subData, testData) =>{
        const today = moment();
        const someday = moment([testData.date.year, testData.date.month - 1, testData.date.day, testData.date.time.hour, testData.date.time.min, 0, 0]);
        

        const diff = someday.diff(today, 'days');

        if(diff === 0){
            const timeDiff = today.diff(someday, "minutes");
            if(timeDiff > testData.duration){
                genData(subData, testData);
            }else{
                return res.status(400).json({msg: "Wait until the test expires."});
            }
        }else if(diff < 0){
            genData(subData, testData);
        }else{
            return res.status(400).json({msg: "Can't Generate Data at this time."});
        }
    }

    const findTest = (subData) =>{
        test.findOne({_id: subData.testId}, (err, doc)=>{
            if(err || !doc){
                return res.status(404).json({msg: "No Test Data Found."});
            }else{
                checkTime(subData, doc);
            }
        })
    }

    const findSubmission = ()=>{
        submission.findOne({_id: submissionId}, (err, doc)=>{
            if(err || !doc){
                return res.status(404).json({msg: "No Data Found."});
            }else{
                findTest(doc);
            }
        })
    }

    //Main JS
    if(!verified){
        return res.status(403).json({msg: "Unverified User."});
    }else if(institute === "null"){
        return res.status(403).json({msg: "User does not have permission to patch test."});
    }else{

        if(!submissionId){
            return res.status(401).json({msg: "Provide Valid Data"});
        }else{
            findSubmission();
        }
    }
}

export default patchSubmission;