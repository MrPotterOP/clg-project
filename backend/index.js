import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/router.js";
import cors from "cors";
dotenv.config();

const App = express();

App.use(cors());
App.use(express.json());
App.use("/api", router);


mongoose.connect(process.env.MONGOURL, {useUnifiedTopology: true, useNewUrlParser: true}, (err)=>{
    if(err){
        console.log("DB Connection Failed.", err);
    }else {
        console.log("DB Connected Successfully.");
    }
});

App.listen(process.nextTick.PORT || 4000, ()=>{
    console.log("Server Running On Port 4000.");
});

