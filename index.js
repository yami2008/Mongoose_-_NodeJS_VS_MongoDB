import mongoose from "mongoose";
import dotenv from "dotenv";
import Person from "./models/personModel.js";

dotenv.config();

const newPerson = new Person({
    name: 'Alice',
    age: 30,
    favoriteFoods: ['Pizza', 'Ice Cream']
});

newPerson.save()
    .then(person => console.log('Person saved:', person))
    .catch(err => console.error('Error saving person:', err));

// Create a new Person instance
const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Sushi', 'Burgers']
});

// Save the Person instance to the database
person.save(function(err, data) {
    if (err) {
        console.error('Error saving person:', err);
    } else {
        console.log('Person saved successfully:', data);
    }
});


// Define an array of people
const arrayOfPeople = [
    {
        name: 'John Doe',
        age: 30,
        favoriteFoods: ['Pizza', 'Pasta']
    },
    {
        name: 'Jane Smith',
        age: 25,
        favoriteFoods: ['Sushi', 'Salad']
    },
    {
        name: 'Alice Johnson',
        age: 35,
        favoriteFoods: ['Burgers', 'Ice Cream']
    },
    {
        name: 'Bob Brown',
        age: 28,
        favoriteFoods: ['Tacos', 'Chocolate']
    }
];
// Create multiple records
Person.create(arrayOfPeople, function(err, data) {
    if (err) {
        console.error('Error creating people:', err);
    } else {
        console.log('People created successfully:', data);
    }
});


// Define the name you want to search for
const searchName = 'John Doe';
// Find all people with the specified name
Person.find({ name: searchName }, function(err, people) {
    if (err) {
        console.error('Error finding people:', err);
    } else {
        console.log('People found:', people);
    }
});


// Define the food you want to search for
const searchFood = 'Sushi';
// Find one person with the specified food in their favoriteFoods
Person.findOne({ favoriteFoods: searchFood }, function(err, person) {
    if (err) {
        console.error('Error finding person:', err);
    } else if (person) {
        console.log('Person found:', person);
    } else {
        console.log('No person found with the specified food.');
    }
});


// Define the ID you want to search for
let personId = '60d21b4667d0d8992e610c85'; // Replace with the actual ID
// Find the person by ID
Person.findById(personId, function(err, person) {
    if (err) {
        console.error('Error finding person by ID:', err);
    } else if (person) {
        console.log('Person found:', person);
    } else {
        console.log('No person found with the specified ID.');
    }
});


// Define the ID of the person to update
personId = '60d21b4667d0d8992e610c85'; // Replace with the actual ID
// Find the person by ID
Person.findById(personId, function(err, person) {
    if (err) {
        console.error('Error finding person by ID:', err);
    } else if (person) {
        // Add "hamburger" to the favoriteFoods array
        person.favoriteFoods.push('hamburger');
        // Check if favoriteFoods is an array without type specification in schema
        if (person.favoriteFoods instanceof Array) {
            person.markModified('favoriteFoods'); // Mark the field as modified
        }
        // Save the updated document
        person.save(function(err, updatedPerson) {
            if (err) {
                console.error('Error saving updated person:', err);
            } else {
                console.log('Updated person:', updatedPerson);
            }
        });
    } else {
        console.log('No person found with the specified ID.');
    }
});



// Define the name of the person to update
const personName = 'Jane Doe'; // Replace with the actual name
// Define the update operation
const update = { age: 20 };
// Find and update the person by name, returning the updated document
Person.findOneAndUpdate(
    { name: personName },  // Query to find the document
    update,                // Update operation
    { new: true },         // Options to return the updated document
    function(err, updatedPerson) {
        if (err) {
            console.error('Error updating person:', err);
        } else if (updatedPerson) {
            console.log('Updated person:', updatedPerson);
        } else {
            console.log('No person found with the specified name.');
        }
    }
);



// Define the ID of the person to delete
personId = '60d21b4667d0d8992e610c85'; // Replace with the actual ID
// Delete the person by ID and return the removed document
Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) {
        console.error('Error deleting person by ID:', err);
    } else if (removedPerson) {
        console.log('Removed person:', removedPerson);
    } else {
        console.log('No person found with the specified ID.');
    }
});



// Define the name of the people to delete
const nameToDelete = 'Mary'; // Replace with the actual name

// Delete all people with the specified name
Person.remove({ name: nameToDelete }, function(err, result) {
    if (err) {
        console.error('Error deleting people by name:', err);
    } else {
        console.log('Delete operation result:', result);
        // Result contains information about the deletion operation
        // result.deletedCount shows the number of documents removed
    }
});



// Define the food to search for
const foodToSearch = 'burritos';

// Chain query helpers to find, sort, limit, and select fields
Person.find({ favoriteFoods: foodToSearch }) // Filter by favoriteFoods
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit results to 2 documents
    .select('name -age') // Select only the name field, exclude age
    .exec(function(err, data) {
        if (err) {
            console.error('Error finding people:', err);
        } else {
            console.log('Found people:', data);
        }
    });



















mongoose
    .connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => {
        console.log(`Server started on: http://127.0.0.1:${process.env.APP_PORT}`)
    })
    .catch(() => {
        console.log("Could not connect to database");
    });
