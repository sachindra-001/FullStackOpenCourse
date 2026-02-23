import { useState, useEffect } from "react";
import noteService from "./services/phone";
import Notification from "./notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Notification state
  const [message, setMessage] = useState({
    message: null,
    type: "success",
  });

  // Fetch data
  // Inside App.jsx
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      // If your backend returns { "persons": [...] }
      if (initialNotes.persons) {
        setPersons(initialNotes.persons);
      }
      // If your backend returns the array directly [...]
      else if (Array.isArray(initialNotes)) {
        setPersons(initialNotes);
      }
    });
  }, []);

  // Add / Update person
  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    // UPDATE
    if (existingPerson) {
      if (window.confirm(`${newName} is already added, replace number?`)) {
        const changedPerson = {
          ...existingPerson,
          number: newNumber,
        };

        noteService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson,
              ),
            );

            setMessage({
              message: `Updated ${returnedPerson.name}`,
              type: "success",
            });

            setNewName("");
            setNewNumber("");

            setTimeout(() => {
              setMessage({ message: null, type: "success" });
            }, 5000);
          })
          .catch(() => {
            // If person already deleted in another browser
            setMessage({
              message: `Information of ${newName} has already been removed from server`,
              type: "error",
            });

            setPersons(persons.filter((p) => p.id !== existingPerson.id));

            setTimeout(() => {
              setMessage({ message: null, type: "error" });
            }, 5000);
          });
      }
    }

    // CREATE
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      noteService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setMessage({
          message: `Added ${returnedPerson.name}`,
          type: "success",
        });

        setNewName("");
        setNewNumber("");

        setTimeout(() => {
          setMessage({ message: null, type: "success" });
        }, 5000);
      });
    }
  };

  // Delete person
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      noteService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));

          setMessage({
            message: `Deleted ${name}`,
            type: "success",
          });

          setTimeout(() => {
            setMessage({ message: null, type: "success" });
          }, 5000);
        })
        .catch(() => {
          setMessage({
            message: `Information of ${name} was already removed`,
            type: "error",
          });

          setPersons(persons.filter((p) => p.id !== id));

          setTimeout(() => {
            setMessage({ message: null, type: "error" });
          }, 5000);
        });
    }
  };

  // Filter
  const personsToShow =
    searchQuery === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Notification */}
      <Notification message={message} />

      {/* Filter */}
      <div>
        filter shown with:{" "}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Form */}
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

      {/* Numbers */}
      <h3>Numbers</h3>

      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default App;
