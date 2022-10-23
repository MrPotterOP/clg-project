import express from "express";

import verifyUser from "../middleware/verifyUser.js";

import postUser from "../controllers/postUser.js";
import postVerificationOTP from "../controllers/postVerificationOTP.js";
import postGenerateOTP from "../controllers/postGenerateOTP.js";
import postLogin from "../controllers/postLogin.js";

const router = express.Router();


router.get("/online", (req, res)=>{
    res.send({"msg": "Server is up and running.."});
});


router.post("/register", postUser);
router.post("/login", postLogin);
router.post("/verificationOTP", verifyUser, postVerificationOTP);
router.post("/generateOTP", verifyUser, postGenerateOTP);


export default router;