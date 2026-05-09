import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";

// import all api
import {register, login, logout, getMe} from "../services/auth.api";


// create custom hook
export const useAuth = () => {

	const context = useContext(AuthContext); // return -> {user, setUser, loading, setLoading}
	const { user, setUser, loading, setLoading} = context;


	/*const handleLogin = async ({email, passsword}) => {
		setLoading(true);
		const data = await login({email, passsword});
		setUser(data.user);
		setLoading(false);
	}

	const handleRegister = async ({username, email, passsword}) => {
		setLoading(true);
		const data = await register({username, email, passsword});
		setUser(data.user);
		setLoading(false);
	}

	const handleLogout = async () => {
		setLoading(true);
		const data = await logout();
		setUser(null);
		setLoading(false);
	}*/

	// use try-catch and finally -> finally change loading state after any error

	const handleLogin = async ({email, passsword}) => {
		setLoading(true);
		try {
			const data = await login({email, passsword});
			setUser(data.user);
		} catch(e) {
			console.log(e);
		}finally{
			setLoading(false);
		}
		
	}

	const handleRegister = async ({username, email, passsword}) => {
		setLoading(true);
		try {
			const data = await register({username, email, passsword});
			setUser(data.user);
		} catch(e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	const handleLogout = async () => {
		setLoading(true);
		try {
			const data = await logout();
		} catch(e) {
			setUser(null);
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	useEffect(()=>{

		// Basic
		/*const getAndSetUser = async() => {
			const data = await getMe();
			setUser(data.user);
			setLoading(false);
		}*/

		// mid-level- try-catch and finally
		/*const getAndSetUser = async() => {
			try {
				const data = await getMe();
				setUser(data.user);
			} catch(e) {
				console.log(e);
			}finally{
				setLoading(false);
			}
		}*/

		// advance -> try-catch and finally
		const getAndSetUser = async() => {
			try {
				const data = await getMe();
				setUser(data.user);
			} catch(e) {
				console.log(e);
				setUser(null);
			}finally{
				setLoading(false);
			}
		}
		getAndSetUser();

	},[]);

	return {user, loading, handleLogin, handleRegister, handleLogout};
}