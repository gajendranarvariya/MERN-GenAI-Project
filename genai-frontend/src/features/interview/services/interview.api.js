import axios from "axios"

const api = axios.create({
	// baseURL:"http:localhost:3000/api/interview"
	baseURL:"http:localhost:3000",
	withCredentials: true
});


/**
 * @description Service to generate interview report based on user self description, resume and job description
*/
export const generateInterviewReport = async({jobDecription, selfDescription, resumeFile}) => {

	const formData = new FormData(); // form data isliye use kar rhe yadi apko frientend se file bhejni hoti h to vo form data se hi ho pata h
	formData.append("jobDecription", jobDecription);
	formData.append("selfDescription", selfDescription);
	formData.append("resume", resumeFile);

	const response = await api.post("/api/interview",formData,{
		headers:{
			"Content-Type":"multipart/form-data"
		}
	});

	return response.data;

}

/**
 * @description Service to get Interivew resport by interviewId
*/
export const getInterviewReportById = async(interviewId) => {

	const response = await api.get(`/api/inetview/report/${interviewId}`);
	return response.data;
}


/**
 *	@description Service to get all interview reports of logger in user 
*/
export const getAllInterviewReport = async () => {
	const response = await api.get(`/api/inetview`);
	return response.data;
}


/**
 *	@description Service to generate resume pdf based on user self description, resume content an
*/
export const generateResumePdf = async ({interviewReportId}) => {
	const response = await api.get(`/api/inetview/resume/pdf/${interviewReportId}`, null, responseType:"blob");
	return response.data;
}