import React, { useState } from "react";

const AddForm: React.FC = () => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [bacteria, setBacteria] = useState("");
  const [isAntibiotic, setIsAntibiotic] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send a request to your server to add the antibiotic or bacteria
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isAntibiotic ? "Add Antibiotic" : "Add Bacteria"}</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      {isAntibiotic && (
        <div>
          <label>
            Group:
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required
            />
          </label>
        </div>
      )}
      {!isAntibiotic && (
        <div>
          <label>
            Bacteria:
            <input
              type="text"
              value={bacteria}
              onChange={(e) => setBacteria(e.target.value)}
              required
            />
          </label>
        </div>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAntibiotic}
            onChange={() => setIsAntibiotic(!isAntibiotic)}
          />
          {isAntibiotic ? "Switch to Add Bacteria" : "Switch to Add Antibiotic"}
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddForm;
