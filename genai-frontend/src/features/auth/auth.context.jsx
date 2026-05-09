
// import {createContext, useState, useEffect } from "react";
// import { getMe } from "./services/auth.api";
import {createContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null);
	// const [loading, setLoading] = useState(false); // old code
	const [loading, setLoading] = useState(true); // new code -> useEffect

	/*useEffect(()=>{
		const getAndSetUser = async() => {
			const data = await getMe();
			setUser(data.user);
			setLoading(false);
		}

		getAndSetUser();

	},[]);*/

	// ye hi same kam hum useAuth me bhi kar sakte h 

	return (
		<>
			<AuthContext.Provider value={{user, setUser, loading, setLoading}}>
				{children}
			</AuthContext.Provider>
		</>	
	)
}










