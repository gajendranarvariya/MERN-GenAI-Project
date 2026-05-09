const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");


async function authUser(req, res, next){

	const token = req.cookies.token;

	if(!token){
		return res.status(401).json({
			message: "Token not founded/provided"
		});
	}


	// verify token in added or not added in blacklist

	/*const isCheckBlacklist = await blacklistTokenModel.findOne({token});
	if(isCheckBlacklist){
		return res.status(401).json({
			message:"Invalid Token. / this token has black listed"
		});	
	}*/


	const isTokenBlacklisted = await blacklistTokenModel.findOne({token});
	if(isTokenBlacklisted){
			// message:"Token is blacklisted. Please login again."
		return res.status(401).json({
			message:"token is invalid"
		});	
	}


	// const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
	/*
		- agar token sahi h to sidha sidha kam ho jayega koi problem nhi h
		- lekin agar token galat nikalta h ya token expire ho chuka h to use time par jwt.verify() ek error throw kar deti h or us error ko handle karne ke liye hum use karege try and catch
	*/


	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
		next();
	} catch(e) {
		// console.log(e);
		return res.status(401).json({
			message:"Invalid Token."
		});		
	}

}


// module.exports = authUser;
module.exports = { authUser };