import { useState, useEffect } from "react";
import personService from "./services/phone"; // Check if your file is named 'phone.js' or 'persons.js'
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

  // Fetch initial data
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    // --- CASE 1: UPDATE EXISTING PERSON ---
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setMessage({
              message: `Updated ${returnedPerson.name}'s number`,
              type: "success",
            });
            setTimeout(
              () => setMessage({ message: null, type: "success" }),
              5000,
            );
          })
          .catch((error) => {
            // Check if error is from Mongoose validation or missing person
            const errorMsg = error.response?.data?.error
              ? error.response.data.error
              : `Information of ${newName} has already been removed from server`;

            setMessage({
              message: errorMsg,
              type: "error",
            });

            if (!error.response?.data?.error) {
              setPersons(persons.filter((p) => p.id !== existingPerson.id));
            }

            setTimeout(
              () => setMessage({ message: null, type: "success" }),
              5000,
            );
          });
      }
    }
    // --- CASE 2: CREATE NEW PERSON ---
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage({
            message: `Added ${returnedPerson.name}`,
            type: "success",
          });
          setTimeout(
            () => setMessage({ message: null, type: "success" }),
            5000,
          );
        })
        .catch((error) => {
          // Access the "error" key from your Backend JSON
          console.log("Validation Error:", error.response.data.error);
          setMessage({
            message: error.response.data.error,
            type: "error",
          });
          setTimeout(
            () => setMessage({ message: null, type: "success" }),
            5000,
          );
        });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage({
            message: `Deleted ${name}`,
            type: "success",
          });
          setTimeout(
            () => setMessage({ message: null, type: "success" }),
            5000,
          );
        })
        .catch(() => {
          setMessage({
            message: `Information of ${name} was already removed`,
            type: "error",
          });
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(
            () => setMessage({ message: null, type: "success" }),
            5000,
          );
        });
    }
  };

  const personsToShow =
    searchQuery === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <div>
        filter shown with:{" "}
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
