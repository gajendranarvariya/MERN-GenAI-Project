
// import { createBrowserRouter } from "react-router-dom"; // dono ek hi pehle ise rect routet dom kehte the
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
	{
		path:"/login",
		element: <Login />
	},
	{
		path:"/register",
		element: <Register />
	},
	{
		path:"/",
		// element: <h1>Home Page</h1>
		// element: <Protected><h1>Home Page</h1></Protected>
		element: <Protected><Home/></Protected>
	},
	{
		path:"/logout",
		// element: <h1>Home Page</h1>
		element: <h1>Logout</h1>
		// element: <Protected><h1>Home Page</h1></Protected>
		
	}
]);


