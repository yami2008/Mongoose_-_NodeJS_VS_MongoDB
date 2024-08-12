// Import the required module
const mongoose = require('mongoose');

// Define the schema for the Person model
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // This field is required
    },
    age: {
        type: Number
    },
    favoriteFoods: {
        type: [String] // Array of strings
    }
});

// Create the model from the schema
const Person = mongoose.model('Person', personSchema);

// Export the model
export default Person