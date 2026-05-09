
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context.jsx";
import {useParam} from "react-router";
import {generateInterviewReport, getInterviewReportById, getAllInterviewReport, generateResumePdf} from "../services/interview.api";



export const useInterview = () => {

	const context = useContext(InterviewContext);
	const interviewId = useParam();

	if(!context){
		throw new Error("useInterview must be used within an InterviewProvider");
	}

	const {report, setReport, reports, setReports, loading, setLoading} = context;

	
	const generateReport = async({jobDescription, selfDescription, resumeFile}) => {
		setLoading(true);
		let response = null;
		try{
			const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
			setReport(response.interviewReport);
		}catch(e){
			console.error("Error generate interview report", e.message);
		}finally{
			setLoading(false);
		}
		return response.interviewReport;
	}


	const getReportById = async(interviewId) => {
		setLoading(true);
		let response = null;
		try{
			const response = await getInterviewReportById(interviewId);
			setReport(response.interviewReport);
		}catch(e){
			console.error("Error generate interview report", e.message);
		}finally{
			setLoading(false);
		}
		return response.interviewReport;
	}


	const getReports = async() => {
		setLoading(true);
		let response = null;
		try{
			const response = await getAllInterviewReport();
			setReport(response.interviewReport);
		}catch(e){
			console.error("Error generate interview report", e.message);
		}finally{
			setLoading(false);
		}
		return response.interviewReport;
	}


	const getResumePdf = async(interviewId) => {
		setLoading(true);
		let response = null;
		try{
			const response = await generateResumePdf({interviewId});
			const url = window.URL.createObjectURL(new Blob([response], {type: "application/pdf"}));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `resume_${interviewId}.pdf`)
			document.body.appendChild(link);
			link.click();

		}catch(e){
			console.error("Error generate interview report", e.message);
		}finally{
			setLoading(false);
		}
		// return response.interviewReport;
	}




	useEffect(()=>{
		if(interviewId){
			getReportById(interviewId);
		}else{
			getReports();
		}
	},[interviewId]);

	return {report, reports, loading, generateReport, getReportById, getReports, getResumePdf};

}
