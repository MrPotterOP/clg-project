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
import postSubmission from "../controllers/postSubmission.js";
import patchSubmission from "../controllers/patchSubmission.js";
import patchPerformance from "../controllers/patchPerformance.js";
import putEditTest from "../controllers/putEditTest.js";

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
router.post("/submission", verifyUser, checkUser, postSubmission);
router.patch("/submission", verifyUser, checkUser, patchSubmission);
router.patch("/performance", verifyUser, checkUser, patchPerformance);
router.put("/edittest", verifyUser, checkUser, putEditTest);


export default router;