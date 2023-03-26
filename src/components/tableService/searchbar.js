import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
const SearchBar = ({ data, setData }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const search = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        id="searchBar"
        value={query}
        onChange={handleInputChange}
        style={{ minWidth: "300px", width: "100%" }}
        fullWidth={true}
      />
      <Button onClick={search}>Search</Button>
    </>
  );
};

export default SearchBar;
