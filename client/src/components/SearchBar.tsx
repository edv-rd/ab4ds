import React, { useState } from "react";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="bg-gray-500 p-4 rounded-lg shadow-md mb-4 container flex flex-col items-left gap-4">
      <input
        type="text"
        placeholder="Search for antibiotics or bacteria..."
        value={query}
        onChange={handleChange}
        className="text-s font-bold text-gray-900"
      />
    </div>
  );
};

export default SearchBar;
