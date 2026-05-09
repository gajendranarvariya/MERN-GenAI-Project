const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware")
const interviewController = require("../controllers/interview.controller");

const interviewRouter = express.Router();

/**
 * @route POST api/interview
 * @description generate new interview report on the basis user self decription, resume pdf and job description
 * @access Private
 * 
 * 
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)


/**
 * @route GET api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access Private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterViewReportByIdController);


/**
 * @route GET api/interview
 * @description get all interview reports of logged in user.
 * @access Private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportController);



/**
 * @route GET api/interview/resume/pdf
 * @description gemerate resume pdf on the basis of user self description, resume and job description
 * @access Private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController);



module.exports = interviewRouter;