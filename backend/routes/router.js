import express from "express";

const router = express.Router();


router.get("/online", (req, res)=>{
    res.send({"msg": "Server is up and running.."});
});

export default router;