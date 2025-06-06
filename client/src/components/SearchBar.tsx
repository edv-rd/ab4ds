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
    <div>
      <input
        type="text"
        placeholder="Search for antibiotics or bacteria..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
