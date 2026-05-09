
// install multer package pdf send
// pdf content ko read karne ke liye hum use karege -> npm i pdf-parse 

const pdfParse = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res){

	// const resumeFile = req.file;

	// const resumeContent = pdfParse(req.file.buffer); // wrong code
	const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
	// const resumeContent = await (new pdfParse.PDFParse(req.file.buffer)).getText();
	const {selfDescription, jobDescription } = req.body;

	// const interviewReportByAI = await generateInterviewReport({resume: resumeContent, selfDescription, jobDescription});
	const interviewReportByAI = await generateInterviewReport({resume: resumeContent.text, selfDescription, jobDescription});

	const interviewReport = await interviewReportModel.create({
		user: req.user.id,
		// resume: resumeContent,
		resume: resumeContent.text,
		selfDescription,
		jobDescription,
		...interviewReportByAI 
	});

	res.status(201).json({
		message:"Interview Report generated successfully",
		interviewReport
	})

}


/**
 * 
 * @description Controller to get interview report by interviewId
 * 
*/
async function getInterViewReportByIdController(req, res){

	const {interviewId} = req.params;

	// const interviewReport = await interviewReportModel.findById(interviewId);
	const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id});
	if(!interviewReport){
		return res.status(404).josn({
			message: "Interview report not found"
		});
	}

	return res.status(200).josn({
		message: "Interview report fetch successfully",
		interviewReport
	});

}

/**
 * 
 * @description Controller to get all interview report of logged in user
 * 
*/
async function getAllInterviewReportController(req, res){

	// const interviewReport = await interviewReportModel.findById(interviewId);
	const interviewReport = await interviewReportModel.find({user:req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behaviouralQuestion -skillGaps -preparationPlan");
	if(!interviewReport){
		return res.status(404).josn({
			message: "Interview report not found"
		});
	}

	return res.status(200).josn({
		message: "Interview report fetch successfully",
		interviewReport
	});

}


/**
 * 
 * @description Controller to generate resume PDF based on user self description, job description and resume
 * 
*/
async function generateResumePdfController(req, res){

	const {interviewReportId} = req.params;

	const interviewReport = await interviewReportModel.findById(interviewReportId);

	if(!interviewReport){
		return res.status(404).json({message:"Interview Report not found"});
	}

	const {resume, jobDescription, selfDescription}  = interviewReport;

	const pdfBuffter = await generateResumePdf({resume, jobDescription, selfDescription});

	res.set({
		"Content-Type":"application/pdf",
		"Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
	})

	res.send(pdfBuffter)

}




module.exports = {generateInterviewReportController, getInterViewReportByIdController}