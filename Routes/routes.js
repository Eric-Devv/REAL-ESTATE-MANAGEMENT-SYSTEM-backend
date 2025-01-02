const express = require("express");
const router = express.Router();
const{addProperty,
    getProperties,
    propertyReview,
    propertyDelete,
    propertyUpdate,} = require("../Controllers/controllers.js")


// API endpoints

// CRUD operations

// Route to add a new property 1. C
router.post("/add-property", addProperty);


// Route to get all properties 2. R
router.get("/", getProperties);


// Route to add a review for a property 3. C
router.post("/:id/review",  propertyReview);


// api to update properties 4. U
router.patch("/:id/update-property", propertyUpdate);


// Delete a property by ID 5. D
router.delete("/:id",  propertyDelete);


module.exports = router;