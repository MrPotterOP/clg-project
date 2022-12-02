import test from "../models/test.js";
import queset from "../models/queset.js";



const postTest = (req, res)=>{
    const {_id, verified, institute} = req.user;
    const {name, description, duration, date, time, questions, level} = req.body;
    var list = [];



    //Functional Components

    const pushList = (x)=>{
        list.push(x._id);
    }

    const createTest = ()=>{
        
        queset.aggregate([{
                "$match": {"level" : level}
            },
            {"$sample" : {"size": questions}}
        ]).exec((err, queSet) => {
            if(err){
                return res.status(402).json({msg: "Input valid questions defficulty."})
            }else{
                queSet.forEach(x =>{
                    pushList(x);
                })
                sheduleTest(list);
            }
        });
    }

    const sheduleTest = (data) =>{
        //date [day] [month] [year]
        const sheduleDate = date.split("/");
        
        //time [hours] [min]
        const sheduleTime = time.split("/");

        if(sheduleDate.length != 3 || sheduleTime.length != 2 || sheduleDate[0] < 0 || sheduleDate[1] < 0 || sheduleDate[2] < 0 || sheduleDate[0] > 31 || sheduleDate[1] > 12 || sheduleDate[2] < 2022 || sheduleTime[0] < 0 || sheduleTime[0] > 23 || sheduleTime[1] < 0 || sheduleTime[1] > 59){
            return res.status(406).json({msg: "Provide valide date and time."});
        }else{
            const completeDate = {
                    day: parseInt(sheduleDate[0]),
                    month: parseInt(sheduleDate[1]),
                    year: parseInt(sheduleDate[2]),
                    time: {hour:parseInt(sheduleTime[0]), min: parseInt(sheduleTime[1])}
            }
            test.create({name, description, duration, questions: data, date: completeDate, institute: _id}, (err, doc)=>{
                if(err){
                    return res.status(400).json({msg: err});
                }else if(!doc){
                    return res.status(406).json({msg: "Not Implimented."});
                }else{
                    return res.json({msg: "Test Sheduled"});
                }
            })
        }
        
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