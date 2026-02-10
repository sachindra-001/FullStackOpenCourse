import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/phone";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);
  console.log("render", persons.length, "persons");
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber };
        noteService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `Information of ${newName} has already been removed from server`,
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return; // Stop the function here if we dealt with an existing person
    }

    // If person doesn't exist, proceed with normal CREATE (POST) logic
    const personObject = { name: newName, number: newNumber };
    noteService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  // Logic to filter the display list
  // If searchQuery is empty, it shows all persons
  const personsToShow =
    searchQuery === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      noteService
        .remove(id)
        .then(() => {
          // Success: remove from local state
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          // ERROR: The 404 you see in the console is caught here
          alert(`Information of ${name} has already been removed from server`);

          // Remove the "ghost" person from your UI state anyway
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };
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
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default App;
