require('dotenv').config();
const mongoose = require("mongoose") 



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connection successful')}).catch((err) => {
    console.error('Database connection error');
  });

  // Define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFoods: {
    type: [String],
    required: true
  }
});



let Person;

const createAndSavePerson = (done) => {
  // Create a new instance of the Person model
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  // Save the document instance
  person.save((err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("Person saved successfully:", data);
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  // Use Model.create() to create multiple people
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("People saved successfully:", data);
      done(null, data);
    }
  });
};
const findPeopleByName = (personName, done) => {
  // Use Model.find() to search for people by name
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("People found:", data);
      done(null, data);
    }
  });
};

const findOneByFood = (food, done) => {
  // Use Model.findOne() to search for a person by food in favorites
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      console.log("Person found:", data);
      done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data)=>{
    if(err){
      console.log(err)
      done(err)
    }
    else{
      console.log("Person Id found", data)
      done(null, data)
    }
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedPerson) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          console.log("Person updated successfully:", updatedPerson);
          done(null, updatedPerson);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName }, // Search criteria
    { age: ageToSet }, // Update field
    { new: true }, // Option to return the updated document
    (err, updatedPerson) => {
      if (err) {
        console.error(err);
        done(err);
      } else {
        console.log("Updated age:", updatedPerson.age);
        done(null, updatedPerson);
      }
    }
  );
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletePerson)=>{
   if(err){
    console.error(err)
    done(err)
   }else{
    console.log("Updated age:", deletePerson);
     done(null, deletePerson);
   }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
 Person.remove({name:nameToRemove},(err, removedPerson)=>{
  if(err){
    console.error(err)
    done(err)
  }
  else{
    console.log("Removed person", removedPerson)
    done(null, removedPerson)
  }
 })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.remove({favoriteFoods:foodToSearch},(err, removedFood)=>{
    if(err){
      console.error(err)
      done(err)
    }
    else{
      console.log("Removed person", removedFood)
      done(null, removedFood)
    }
   })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
// Create the Person model
Person = mongoose.model('Person', personSchema);
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
