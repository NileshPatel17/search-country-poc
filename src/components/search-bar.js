import React from "react";

const debounce = (func, delay) => {
  let debounceTimer;
  return function(...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = React.useState("");
  const delayQuery = React.useRef(
    debounce(value => {
      onSearch(value);
    }, 400)
  ).current;
  const OnChange = event => {
    event.persist();
    setInput(event.target.value);
    // onSearch(event.target.value);
    delayQuery(event.target.value);
  };
  const clearInput = () => {
    setInput("");
    onSearch("");
  };
  return (
    <div style={{ margin: "20px 0px" }}>
      <span>Search Country:</span>
      <span>
        <input value={input} placeholder="search country" onChange={OnChange} style={{ width: "30%", marginLeft: "10px", border: "1px solid lightgrey", padding: "0px 4px" }} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 px-2 rounded" onClick={clearInput}>
          clear
        </button>
      </span>
    </div>
  );
};
