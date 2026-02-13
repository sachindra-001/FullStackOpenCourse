import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // 1. Fetch all countries once when the app loads
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  // 2. Filter countries based on search input
  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  // 3. Reset selected country if the search results change
  useEffect(() => {
    setSelectedCountry(null);
  }, [search]);

  const handleShowChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      find countries:{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* Logic to decide what to show */}
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList list={countriesToShow} handleShow={handleShowChange} />
      )}
    </div>
  );
};

// Sub-component for the list
const CountryList = ({ list, handleShow }) => {
  if (list.length > 10) return <p>Too many matches, specify another filter</p>;
  if (list.length === 1) return <CountryDetail country={list[0]} />;

  return (
    <ul>
      {list.map((c) => (
        <li key={c.cca3}>
          {c.name.common}
          <button onClick={() => handleShow(c)}>show</button>
        </li>
      ))}
    </ul>
  );
};

// Sub-component for the detail view
const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt="flag" width="150" />
  </div>
);

export default App;
