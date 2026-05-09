const mongoose = require("ongoose");


/*const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("connect to db...");
	} catch(e) {
		console.log(e);
	}

}*/


async function connectToDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to database...");
	} catch(e) {
		console.log(e);
	}

}

module.exports = connectToDB;