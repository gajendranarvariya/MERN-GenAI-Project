

import {useState, useRef} from "react";
import "../style/home.scss";
import {useInterview} from "../hook/useInterview.js";
import {useNavigate} from "react-router";

const Home = () => {

	const {loading, generateReport, reports} = useInterview();

	const [jobDescription, setJobDescription] = useState("");
	const [selfDescription, setSelfDescription] = useState("");
	const resumeInputRef = useRef();
	const navigate = useNavigate();

	const handleGenerateReport = async() => {
		const resumeFile = resumeInputRef.current.files[0];
		const data = await generateReport({jobDescription, selfDescription, resumeFile});
		navigate(`/interview/${data._id}`);
	}

	if(loading){
		return <div>Loading...</div>
	}

	return (
		<>
			<main className="home">
				<div className="interview-input-group">					
					<div className="left">
						<label htmlFor="jobDescription">Job Description</label>
						<textarea onChange={(e)=>setJobDescription(e.target.value)} value={jobDescription} name="jobDescription" id="jobDescription" placeholder="Enter job description here..."></textarea>	
					</div>
					<div className="right">
						<div className="input-group">
							<p>Resume <small className="highlight">(Use Resume and self description together for best results)</small></p>
							<label className="file-label" htmlFor="resume">Upload Resume</label>
							<input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept=".pdf" />
						</div>
						<div className="input-group">
							<textarea onChange={(e)=>setSelfDescription(e.target.value)} value={selfDescription} name="selfDescription" id="selfDescription" placeholder="Enter self description here..."></textarea>	
						</div>
						<button onClick={handleGenerateReport} className="button primary-button">Generate Interview Report</button>
					</div>			
				</div>
			</main>


			{/*{reports.map(()=>{

			})}*/}

			{reports.length > 0 && (
				<section>
					<h2>My Recent Interview Plans</h2>
					<ul className="reports-list">
						{reports.map((report)=>{
							return (
								<li key={report._id} className="report-item" onClick={()=>navigate(`/interview/${report._id}`)}>
									<h3>{report.title || 'Untitled Position'}</h3>
									<p>Generate on {new Date(report.createdAt).toLowerCase}</p>
									<p className="match-score"></p>
								</li>
							)
						})}
					</ul>
				</section>
			)}
		</>
	)
}

export default Home;