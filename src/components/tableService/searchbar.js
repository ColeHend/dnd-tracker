import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
const SearchBar = ({ data, setData, allTableData, filterFunc }) => {
  const [query, setQuery] = useState("");

  const search = async () => {
    let filteredData=[];
    if (filterFunc) {
      filteredData = await filterFunc(query);
      console.log("filteredData", filteredData)
    } else {
       filteredData = allTableData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filteredData.length) {
      setData(filteredData);
      console.log("data", data);
      console.log("allTableData", allTableData);
      console.log("filteredData", filteredData);
    }
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        id="searchBar"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={{ minWidth: "300px", width: "90%" }}
        fullWidth={true}
      />
      <Button style={{width:"10%"}} onClick={search}>Search</Button>
    </>
  );
};

export default SearchBar;
