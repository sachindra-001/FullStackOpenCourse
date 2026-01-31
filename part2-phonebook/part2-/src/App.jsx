import { useState } from "react";

const App = () => {
  // Initial state with one person
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  // State for the controlled input field
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault(); // Prevents the page from reloading on submit

    // Create a new object for the person
    const personObject = {
      name: newName,
    };

    // Update the list of persons and reset the input field
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    // Updates newName state with every keystroke
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder="enter name..."
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
