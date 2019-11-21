import React from "react";

export function CountryList({ list }) {
  if (list.length === 0) {
    return <span>Not Found</span>;
  }
  return (
    <table>
      <thead>
        <tr className="bg-blue-500 text-white">
          <th>Country Name</th>
          <th>Capital</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.capital}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
