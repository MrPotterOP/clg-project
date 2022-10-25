import express from "express";

import verifyUser from "../middleware/verifyUser.js";

import postUser from "../controllers/postUser.js";
import postVerificationOTP from "../controllers/postVerificationOTP.js";
import postGenerateOTP from "../controllers/postGenerateOTP.js";
import postLogin from "../controllers/postLogin.js";
import postTest from "../controllers/postTest.js";
import checkUser from "../middleware/checkUser.js";

const router = express.Router();


router.get("/online", (req, res)=>{
    res.send({"msg": "Server is up and running.."});
});


router.post("/register", postUser);
router.post("/login", postLogin);
router.post("/verificationOTP", verifyUser, postVerificationOTP);
router.post("/generateOTP", verifyUser, postGenerateOTP);
router.post("/createTest", verifyUser, checkUser, postTest);


export default router;