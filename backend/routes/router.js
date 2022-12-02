import express from "express";

import verifyUser from "../middleware/verifyUser.js";
import checkUser from "../middleware/checkUser.js";

import postUser from "../controllers/postUser.js";
import postVerificationOTP from "../controllers/postVerificationOTP.js";
import postGenerateOTP from "../controllers/postGenerateOTP.js";
import postLogin from "../controllers/postLogin.js";
import postTest from "../controllers/postTest.js";
import getInstitutes from "../controllers/getInstitutes.js";
import getDashboard from "../controllers/getDashboard.js";
import postQuestions from "../controllers/postQuestions.js";
import patchTest from "../controllers/patchTest.js";

const router = express.Router();


router.get("/institutes", getInstitutes);
router.get("/dashboard", verifyUser, checkUser, getDashboard);



router.post("/register", postUser);
router.post("/login", postLogin);
router.post("/verificationOTP", verifyUser, postVerificationOTP);
router.post("/generateOTP", verifyUser, checkUser, postGenerateOTP);
router.post("/createTest", verifyUser, checkUser, postTest);
router.post("/addquestions", postQuestions);
router.patch("/test", verifyUser, checkUser, patchTest);


export default router;