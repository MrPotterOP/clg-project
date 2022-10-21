import express from "express";

import postUser from "../controllers/postUser.js";

const router = express.Router();


router.get("/online", (req, res)=>{
    res.send({"msg": "Server is up and running.."});
});


router.post("/register", postUser);
export default router;