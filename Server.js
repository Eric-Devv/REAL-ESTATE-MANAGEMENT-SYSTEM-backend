require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./Routes/routes")
const PORT = process.env.PORT




// Middlewares

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	});
	

	
	


// Universal server routing
app.use('./api/properties/', routes)



//app's server port configuration
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port`,PORT);
});