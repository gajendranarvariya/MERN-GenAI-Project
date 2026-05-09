import {useState, useEffect, useParam} from "react";
import "../style/interview.scss";
import {useInterview} from "../hooks/useInterview.js";

const Interview = () => {
	
	const { report, getReportById, loading, getResumePdf } = useInterview();
	const {interviewId} = useParam();

/*useEffect(()=>{
		if(interviewId){
			getReportById(interviewId);
		}
	},[interviewId]);*/


	return (
		<>
			<div>Interview Pannel / Question</div>

			<button className="button primary-button" onClick={()=>getResumePdf(interviewId)}>
				Download Resume
			</button>
		</>
	);
}

export default