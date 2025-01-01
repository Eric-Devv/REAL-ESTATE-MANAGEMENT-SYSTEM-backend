const express = require("express");
const router = express.Router();
const{addProperty,
    getProperties,
    propertyReview,
    propertyDelete,
    propertyUpdate,} = require("../Controllers/controllers")


// API endpoints

// CRUD operations

// Route to add a new property 1. C
router.post("/api/properties", addProperty);


// Route to get all properties 2. R
router.get("/api/properties", getProperties);


// Route to add a review for a property 3. C
router.post("/api/properties/:id/review",  propertyReview);


// api to update properties 4. U
router.patch("/api/properties/:id/update-property", propertyUpdate);


// Delete a property by ID 5. D
router.delete("/api/properties/:id",  propertyDelete);


module.exports = router;