import test from "../models/test.js";
import submission from "../models/submission.js";
import moment from "moment";
const getDashboard =  (req, res) =>{
    const {verified, institute, _id} = req.user;

    //Operations

    const getUpcommingTests = (prevTest)=>{
        test.find({institute}, (err, doc)=>{
            if(err || !doc){
                return res.status(400).json({msg: "No test data found."});
            }else{
                const today = moment();
                const upTest = [];

                doc.forEach(t =>{
                    const someday = moment([t.date.year, t.date.month - 1, t.date.day, t.date.time.hour, t.date.time.min, 0, 0]);
                    const diff = someday.diff(today, 'days');

                    if(diff > 0){
                        upTest.push({id: t._id, name: t.name,today: false, days: diff});
                    }else if(diff === 0){
                        upTest.push({id: t._id, name: t.name, date: t.date, today: true});
                    }
                });

                return res.json({prevTest, upTest});
            }
        })
    }

    const genStudentDashbord = ()=>{
        submission.find({student: _id}, (err, doc)=>{
            if(err || !doc){
                return res.status(400).json({msg: "No data found."});
            }else{
                getUpcommingTests(doc);
            }
        });
    }

    const sortTest = (docs)=>{
        const today = moment();
            const upTest = [];
            const prevTest = [];
            docs.forEach(t =>{
                const someday = moment([t.date.year, t.date.month - 1, t.date.day, t.date.time.hour, t.date.time.min, 0, 0]);
                const diff = someday.diff(today, 'days');

                if(diff > 0){
                    upTest.push({id: t._id, name: t.name, today: false, days: diff});
                }else if(diff === 0){
                    upTest.push({id: t._id, name: t.name, date: t.date, today: true});
                }else if(diff < 0){
                    prevTest.push({id: t._id, name: t.name, days: diff});
                }
            });

            return res.json({prevTest, upTest});
    }

    const genInstituteDashbord = ()=>{
        test.find({institute: _id}, (err, docs)=>{
            if(err || !docs){
                return res.status(404).json({msg: "Can't find tests."});
            }else{
                sortTest(docs);
            }
        })
    }

    

    if(!verified){
        return res.status(401).json({msg: "Get verified to access this route."});
    }else{
        if(institute === "null"){
            genInstituteDashbord();
        }else{
            genStudentDashbord();
        }
    }
}

export default getDashboard;