// install i]rhis node package:-

// npm install @google/genai
// npm install zod
// npm install zod-to-json-schema

const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
	apiKey: process.env.GOOGLE_GENAI_API_KEY
});


// Sample run test 
/*async function invokeGeminiAI(){
	const response = await ai.models.generateContent({
		model:"gemini-2.5-flash",
		contents = 'Hello gemini ! Explain what is Interview'
	})
}

module.exports = invokeGeminiAI;
*/


/*const interviewReportSchema = z.object({
	matchScore: z.number().description("A score between 0 and 100 indicating how well the candidate`s profile matches the job description"),
	technicalQuestions: z.array(z.object({
		question: z.string().description("The technical question can be asked in the interview"),
		intention: z.string().description("The intention of interviewer behind asking this question"),
		answer: z.string().description("How to answer this question, what points to cover, what approach to take etc")
	})).description("Technical question that can be asked in the interview along with their intention and how to a answer them"),
	behavioralQuestions: z.array(z.object({
		question: z.string().description("The technical question can be asked in the interview"),
		intention: z.string().description("The intention of interviewer behind asking this question"),
		answer: z.string().description("How to answer this question, what points to cover, what approach to take etc")
	})).description("Behavioral question that can be asked in the interview along"),
	skillGaps: z.array(z.object({
		skill: z.string().description("The skill which the candidate is lacking"),
		severity: z.enum(["low","medium","high"]).description("The severity of this skill gap, i.e."),
	})).description("List of skill gaps in the candidate profile along with their"),
	preparationPlan: z.array(z.object({
		day: z.number().description("The day number in the preparation plan starting from 1"),
		focus: z.string().description("The main focus of this day in the preparation plan e.g. data structure, system design, mock interviews"),
		tasks: z.array(z.string()).description("List of tasks to be done on this day to follow the preparation plan e.g read a specific book"),
	})).description("A dat-wise preparation plan for the candidate to follow in order to prepare for the interview effective"),
})
*/

const interviewReportSchema = z.object({
	matchScore: z.number().description("A score between 0 and 100 indicating how well the candidate`s profile matches the job description"),
	technicalQuestions: z.array(z.object({
		question: z.string().describe("The technical question can be asked in the interview"),
		intention: z.string().describe("The intention of interviewer behind asking this question"),
		answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc")
	})).describe("Technical question that can be asked in the interview along with their intention and how to a answer them"),
	behavioralQuestions: z.array(z.object({
		question: z.string().describe("The technical question can be asked in the interview"),
		intention: z.string().describe("The intention of interviewer behind asking this question"),
		answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc")
	})).describe("Behavioral question that can be asked in the interview along"),
	skillGaps: z.array(z.object({
		skill: z.string().describe("The skill which the candidate is lacking"),
		severity: z.enum(["low","medium","high"]).describe("The severity of this skill gap, i.e."),
	})).describe("List of skill gaps in the candidate profile along with their"),
	preparationPlan: z.array(z.object({
		day: z.number().describe("The day number in the preparation plan starting from 1"),
		focus: z.string().describe("The main focus of this day in the preparation plan e.g. data structure, system design, mock interviews"),
		tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan e.g read a specific book"),
	})).describe("A dat-wise preparation plan for the candidate to follow in order to prepare for the interview effective"),
	title:z.string().describe("The title of the job for which the interview report is generated"),
})




async function generateInterviewReport({resume, selfDescription, jobDescription}){
	
	const prompt = `Generate an interview report for a candidate with the following details:
		Resume: ${resume}
		Self Description: ${selfDescription}
		Job Description: ${jobDescription}
	`;

	const response = await ai.models.generateContent({
		// model: "gemini-2.5-flash",
		model: "gemini-3-flash-preview",
		contents = prompt,
		config:{
			responseMimeType: "application/json",
			// responseJsonSchema: zodToJsonSchema(interviewReportSchema); // wrong h
			responseSchema: zodToJsonSchema(interviewReportSchema)
		}
	});

	// const data = JSON.parse(response.text);
	// console.log(data);
	// console.log(response.text);

	return JSON.parse(response.text);
}


async function generatePdfFormHtml(htmlContent){

	const browser = await puppeteer.lanch();
	const page = await browser.newPage();

	// await page.goto() // agr kisi url website page ko pdf me convert karn h to se use karna
	// but hum HTML content ko PDF mr convert karnee bale h to hum use karege
	// await page.setContent(htmlContent, {waitUntil: "networkidle2"})
	await page.setContent(htmlContent, {waitUntil: "networkidle0"});

	const pdfBuffer = await page.pdf({format: "A4"});

	await browser.close();

	return pdfBuffer;

}

async function generateResumePdf({resume, selfDescription, jobDescription}) {

	const resumePdfSchema = z.object({
		html: z.string().describe("The HTML content of the resume of the resume which can be converted to PDF using a puppeteer")
	});

	const prompt = `Generate resume for a candidate with the following details:
						Resume: ${resume}
						Self Description: ${selfDescription}
						Job Description: ${jobDescription}

						the response should be a JSON Object with a single field "HTML" which contains the HTML content of the resume which ca be converted to PDF using any library puppeteer
						The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and value
						The content of resume should be not sound like it's generated by AI and should be as clone as possible to real human-written resume.
						You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
						The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
						The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relavant information that can increase the candidate's change to getting an interview call for the given job description.
					`;

	const response = await ai.models.generateContent({
		// model: "gemini-2.5-flash",
		model: "gemini-3-flash-preview",
		contents = prompt,
		config:{
			responseMimeType: "application/json",
			// responseJsonSchema: zodToJsonSchema(interviewReportSchema); // wrong h
			responseSchema: zodToJsonSchema(resumePdfSchema)
		}
	});					

	// return JSON.parse(response.text);
	const jsonContent = JSON.parse(response.text);

	const pdfBuffer = await generatePdfFormHtml(jsonContent.html)

	return pdfBuffer;
}

// module.exports = generateInterviewReport;
module.exports = {generateInterviewReport, generateResumePdf};










