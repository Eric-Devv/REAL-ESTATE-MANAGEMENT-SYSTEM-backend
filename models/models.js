const mongoose = require("mongoose");


// Define the Property schema
const propertySchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	image: String,
	contact: String,
	reviews: [
		{
			user: String,
			rating: Number,
			comment: String,
		},
	],
});

module.exports = mongoose.model("Property", propertySchema);
