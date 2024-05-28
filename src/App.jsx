import { useState } from "react";
import { WorldMap, regions } from "react-svg-worldmap";
import "./app.css";

function App() {
  const [data, setData] = useState([]); // Used for colouring visited countries on the map
  const [countries, setCountries] = useState([]); // Used to display visited country names in the list
  const [searchValue, setSearchValue] = useState("");

  const handleClick = (event) => {
    // Get values for the clicked country
    const { countryCode, countryName } = event;
    // Uncolour country if already coloured
    if (data.some((c) => c.country === countryCode)) {
      setData(data.filter((c) => c.country !== countryCode));
      setCountries(countries.filter((c) => c !== countryName));
    }
    // Colour country
    else {
      setData([...data, { country: countryCode, value: "" }]);
      setCountries([...countries, countryName]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Search for a country with the given country code or country name
    const searchResult = regions.find(
      (r) =>
        r.code.toLowerCase() === searchValue.toLowerCase() ||
        r.name.toLowerCase() === searchValue.toLowerCase()
    );
    if (searchResult) {
      // Colour or uncolour the country searched
      handleClick({
        countryCode: searchResult.code,
        countryName: searchResult.name,
      });
      setSearchValue("");
    }
  };

  // Update search value on change
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <h1 id="title">Places I Have Visited</h1>
      <div id="content-div">
        <div id="world-map-div">
          <div id="world-map-info">
            <h2>World Map</h2>
            <p>Click on a country to mark/unmark it.</p>
            <p>
              You can also search for the country code or the country name
              below.
            </p>
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Country code or name"
                value={searchValue}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <WorldMap
            color="#9C20C9"
            backgroundColor="aqua"
            frame={true}
            frameColor="#9C20C9"
            data={data}
            onClickFunction={handleClick}
          />
        </div>
        <div id="country-list-div">
          <h2>Country List</h2>
          <ul>
            {countries.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>Total visted countries: {countries.length}</p>
        </div>
      </div>
    </>
  );
}

export default App;
