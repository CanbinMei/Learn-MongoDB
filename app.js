// --------------- Mongoose essentials.
const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
// Connect to localhost port 27017 and create a database called "fruitDB".
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });


// ------------------------------------------------------------------------------------------------------------------------------------


// --------------- Create a schema for fruit data.
const fruitSchema = new mongoose.Schema({
  name: { // Name is required.
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: { // Rating has to be from 1 - 10.
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})

// --------------- Create a Fruit mongoose model and fruits collection.
//    Name of the model      Name of the collection in database(It would become "fruits" in the database.)
//      ↓                       ↓
const Fruit = mongoose.model("Fruit", fruitSchema);

// --------------- Create a new Fruit object called "lemon".
const lemon = new Fruit({
  name: "Lemon",
  rating: 2,
  review: "I hate it, but it is useful."
});
// --------------- Save lemon in to the "fruits" collection.
// lemon.save();
// Every time app.js is run, this line would save the same entry to the database.
// therefore the database will have multiple entry if app.js is run multiple times.

// --------------- Create a new Fruit object called "lychee".
const lychee = new Fruit({
  name: "Lychee",
  rating: 10,
  review: "I like lychee more than mochi!"
})
// --------------- Save lychee in to the "fruits" collection.
// lychee.save();
// Every time app.js is run, this line would save the same data to the database.
// Therefore the database will have multiple data if app.js is run multiple times.

// --------------- Create more Fruit objects.
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 1,
  review: "The worst fruit ever!"
});
const orange = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Too sour for me."
});
const banana = new Fruit({
  name: "Banana",
  rating: 8,
  review: "I like it!"
});

// --------------- Insert all the fruits created above to fruit collection.
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

// --------------- Update the Orange entry to Peach. (Change the name from Orange to Peach.)
//                          The id of Orange
//                                 ↓
Fruit.updateOne({_id: "5e4b084bb33af30da63a8159"}, {name: "Peach"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Successfully updated the document.");
  }
});
// > db.fruits.find()
// { "_id" : ObjectId("5e4b01966b00f80cb98413f2"), "name" : "Lemon", "rating" : 2, "review" : "I hate it, but it is useful.", "__v" : 0 }
// { "_id" : ObjectId("5e4b023549c9180cd4b94e73"), "name" : "Lychee", "rating" : 10, "review" : "I like lychee more than mochi!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8158"), "name" : "Kiwi", "rating" : 1, "review" : "The worst fruit ever!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8159"), "name" : "Orange", "rating" : 7, "review" : "Too sour for me.", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a815a"), "name" : "Banana", "rating" : 8, "review" : "I like it!", "__v" : 0 }
//                     --------------- Become ---------------
// > db.fruits.find()
// { "_id" : ObjectId("5e4b01966b00f80cb98413f2"), "name" : "Lemon", "rating" : 2, "review" : "I hate it, but it is useful.", "__v" : 0 }
// { "_id" : ObjectId("5e4b023549c9180cd4b94e73"), "name" : "Lychee", "rating" : 10, "review" : "I like lychee more than mochi!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8158"), "name" : "Kiwi", "rating" : 1, "review" : "The worst fruit ever!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8159"), "name" : "Peach", "rating" : 7, "review" : "Too sour for me.", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a815a"), "name" : "Banana", "rating" : 8, "review" : "I like it!", "__v" : 0 }

// --------------- Delete one entry with the name = "Banana".
Fruit.deleteOne({name: "Banana"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Successfully deleted the document.");
  }
})
// > db.fruits.find()
// { "_id" : ObjectId("5e4b01966b00f80cb98413f2"), "name" : "Lemon", "rating" : 2, "review" : "I hate it, but it is useful.", "__v" : 0 }
// { "_id" : ObjectId("5e4b023549c9180cd4b94e73"), "name" : "Lychee", "rating" : 10, "review" : "I like lychee more than mochi!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8158"), "name" : "Kiwi", "rating" : 1, "review" : "The worst fruit ever!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8159"), "name" : "Peach", "rating" : 7, "review" : "Too sour for me.", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a815a"), "name" : "Banana", "rating" : 8, "review" : "I like it!", "__v" : 0 }
//                     --------------- Become ---------------
// > db.fruits.find()
// { "_id" : ObjectId("5e4b01966b00f80cb98413f2"), "name" : "Lemon", "rating" : 2, "review" : "I hate it, but it is useful.", "__v" : 0 }
// { "_id" : ObjectId("5e4b023549c9180cd4b94e73"), "name" : "Lychee", "rating" : 10, "review" : "I like lychee more than mochi!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8158"), "name" : "Kiwi", "rating" : 1, "review" : "The worst fruit ever!", "__v" : 0 }
// { "_id" : ObjectId("5e4b084bb33af30da63a8159"), "name" : "Peach", "rating" : 7, "review" : "Too sour for me.", "__v" : 0 }


//------------------------------------------------------------------------------------------------------------------------------------


// --------------- Create a schema for person data.
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema  // This line create a relationship between fruits collection and people collection.
})

// --------------- Create a Fruit mongoose model and people collection.
//    Name of the model      Name of the collection in database(It would become "people" in the database.)
//      ↓                       ↓
const Person = mongoose.model("Person", personSchema);

// --------------- Create a new Person object called "Kay".
const kay = new Person({
  name: "Kay",
  age: 26,
  favoriteFruit: lychee
});
// kay.save();
// Every time app.js is run, this line would save the same entry to the database.
// Therefore the database will have multiple entry if app.js is run multiple times.

const nelson = new Person({
  name: "Nelson",
  age: 26,
  favoriteFruit: lemon
});
// nelson.save();
// Every time app.js is run, this line would save the same entry to the database.
// Therefore the database will have multiple entry if app.js is run multiple times.


// --------------- Delete all entries with the name "Kay".
// Person.deleteMany({name: "Kay"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all the documents");
//   }
// })


//------------------------------------------------------------------------------------------------------------------------------------


// --------------- Console log every fruit entry.
//                        Array
//                          ↓
Fruit.find(function(err, fruits){
  if(err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    // Console log all the data.
    console.log(fruits);

    // Console.log just the name of each entry.
    // fruits.forEach(function(fruit){
    //   console.log(fruit.name);
    // })
  }
});
