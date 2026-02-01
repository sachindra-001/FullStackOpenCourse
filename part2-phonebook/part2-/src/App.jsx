import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  // Logic to filter the display list
  // If searchQuery is empty, it shows all persons
  const personsToShow =
    searchQuery === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search Field */}
      <div>
        filter shown with:
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      {/* Use personsToShow instead of persons */}
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
