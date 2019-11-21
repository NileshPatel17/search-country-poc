import React, { useState, useEffect } from "react";
import { Header } from "./components/header";
import { Pagination } from "./components/pagination";
import { SearchBar } from "./components/search-bar";
import { fetchCountries } from "./services/country-service";
import { CountryList } from "./components/country-list";
import "./App.css";

const PAGE_SIZE = 10;
function filter(sourceData, searchText) {
  return searchText ? sourceData.filter(item => item.name.toLowerCase().includes(searchText)) : sourceData;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    fetchCountries().then(data => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const onSearch = inputText => {
    setSearchText(inputText);
    setPageIndex(0);
  };
  const onPageIndexChange = currPage => {
    setPageIndex(currPage);
  };
  const start = pageIndex * PAGE_SIZE + 1;
  const end = start + PAGE_SIZE;
  const filterCountries = filter(countries, searchText);
  const totalPages = Math.floor(filterCountries.length / PAGE_SIZE);
  return (
    <div>
      <Header />
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div style={{ margin: "10px auto", width: "600px" }}>
          <SearchBar onSearch={onSearch} />
          <CountryList list={filterCountries.slice(start, end)} />
          <Pagination totalPages={totalPages} currentPage={pageIndex + 1} onPageIndexChange={onPageIndexChange} />
        </div>
      )}
    </div>
  );
}

export default App;
