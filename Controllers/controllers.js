const Property = require("../models/models")


// controller to add a new property
const addProperty = async(req, res) =>  {
    const { title, description, price, image, contact } = req.body;
	try {
		// Validate request data
		if (!title || !description || !image || !contact ||!price) {
			return res
				.status(400)
				.json({ message: "Incomplete property data" });
		}

		// Create a new property
		const newProperty = Property({
			title,
			description,
			price,
			image,
			contact,
			reviews: [],
		});

		// Save the new property to the database
		const savedProperty = await newProperty.save();

		// Respond with the newly added property
		res.status(201).json(savedProperty);
	} catch (error) {
		console.error("Error adding property:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

// controller to get all properties
const getProperties = async(req, res) => {
    try {
		const properties = await Property.find();
		res.json(properties);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// controller to add a review for a property
const propertyReview = async(req, res) => {
    const { user, rating, comment } = req.body;

	try {
		const property = await Property.findById(req.params.id);
		property.reviews.push({ user, rating, comment });
		await property.save();
		res.status(201).json(property);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

// Delete a property by ID
const propertyDelete = async(req, res) => {
    const propertyId = req.params.id;

	try {
		// Find the property by ID and delete it from the database
		const deletedProperty = await Property.findByIdAndDelete(propertyId);

		if (!deletedProperty) {
			return res.status(404).json({ message: "Property not found" });
		}

		res.json({ message: "Property deleted", deletedProperty });
	} catch (error) {
		console.error("Error deleting property:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

// update a property
const propertyUpdate = async(req, res) => {
	const propertyId = req.params.id;

	try {
	  // Attempt to find and update the property
	  const updatedProperty = await Property.findByIdAndUpdate(
		propertyId,
		{ ...req.body }, // Spread the request body for updates
		{ new: true } // Return the updated document
	  );
  
	  if (!updatedProperty) {
		// If no property is found, send a 404 response
		return res.status(404).json({ message: "No such property" });
	  }
  
	  // Send a success response with the updated property
	  res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
	} catch (error) {
	  // Handle any errors
	  res.status(500).json({ message: "Server error", error: error.message });
	}
}

module.exports = {
    addProperty,
    getProperties,
    propertyReview,
    propertyUpdate,
    propertyDelete,
}