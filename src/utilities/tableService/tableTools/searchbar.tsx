import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

interface SearchBarProps {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  allTableData: any[];
  filterFunc?: (query: string) => Promise<any[]> | any[];
}

const SearchBar = (props:SearchBarProps) => {
  const { data, setData, allTableData, filterFunc } = props;
  const [query, setQuery] = useState("");

  const search = async () => {
    let filteredData=[];
    if (filterFunc) {
      filteredData = await filterFunc(query);
    } else {
       filteredData = allTableData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filteredData.length) {
      setData(filteredData);
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
