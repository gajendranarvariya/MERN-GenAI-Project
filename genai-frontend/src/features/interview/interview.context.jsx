
// import {createContext, useState, useEffect } from "react";
// import { getMe } from "./services/auth.api";
import {createContext, useState } from "react";


export const InterviewContext = createContext();


export const InterviewProvider = ({ children }) => {

	const [report, setReport] = useState(null);
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(false);

	return (
		<>
			<InterviewContext.Provider value={{report, setReport, reports, setReports, loading, setLoading}}>
				{children}
			</InterviewContext.Provider>
		</>	
	)
}










