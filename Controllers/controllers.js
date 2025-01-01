const Property = require("../models/models")


// controller to add a new property
const addProperty = async(req, res) =>  {
    const { title, description, image, contact } = req.body;
	try {
		// Validate request data
		if (!title || !description || !image || !contact) {
			return res
				.status(400)
				.json({ message: "Incomplete property data" });
		}

		// Create a new property
		const newProperty = new Property({
			title,
			description,
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

    if (!updateProperty(propertyId)){
        return res.status(404).json({message: "No such property"})
    }
    res.status(200).json({message: "property updated", updateProperty});

    const updateProperty = await Property.findByIdandUpdate(propertyId, {
    ...req.body
    });
}

module.exports = {
    addProperty,
    getProperties,
    propertyReview,
    propertyUpdate,
    propertyDelete,
}