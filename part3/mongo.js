const mongoose = require("mongoose");

// Check for minimum arguments
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

// Replace <db_password> with the password variable and set your database name (e.g., phonebookApp)
const url = `mongodb+srv://sachindravandse8_db_user:${password}@cluster0.cowdetd.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define the Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Define the Model
const Person = mongoose.model("Person", personSchema);

// CASE 1: Only password provided - List all entries
if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// CASE 2: Name and Number provided - Add new entry
if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
