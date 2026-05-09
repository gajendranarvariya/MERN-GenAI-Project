
import axios from "axios";


// export const register = (username,email,password) => {}

// export async function register(username,email,password){ } // as argument

export async function register({username,email,password}){ // as object argument

	try {
			const response = await axios.post("http://localhost:3000/api/auth/register",{
				username, email, password
			},{
				withCredentials: true
			});

			return response.data;

		} catch(e) {
			console.log(e);
		}	
		
	/*
		jab ap axios ka use karte ho apni api ko call karne ke liye to vo by default access nhi deta h cookie ka access nhi deta apke server ko
		- iske liye hume ek flag dena padta h jiska name h withCredentials:true,

		-> agar app iska use karte ho to apko server ko ye access hota h ki vo cookie me kisi bhi deta ko read and write kar sakta h
		-> ab is api me hame error a sakte h iske liye hu isme error handle karne ke liye try and catch ka use kar sakte h -> ya isme hum then and catch ka bhi use kar sakte h 
	*/

}

export async function login({email,password}){ 

	try {
			const response = await axios.post("http://localhost:3000/api/auth/login",{
				email, password
			},{
				withCredentials: true
			});

			return response.data;
			
		} catch(e) {
			console.log(e);
		}	
}


export async function logout(){ 

	try {
			const response = await axios.get("http://localhost:3000/api/auth/logout",{
				withCredentials: true
			});

			return response.data;
			
		} catch(e) {
			console.log(e);
		}	
}



export async function getMe(){ 

	try {
			const response = await axios.get("http://localhost:3000/api/auth/get-me",{
				withCredentials: true
			});

			return response.data;
			
		} catch(e) {
			console.log(e);
		}	
}
