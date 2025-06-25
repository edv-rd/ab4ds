import React, { useEffect, useState } from "react";

interface ViewSpecimenProps {
  name: string;
  antibiotic: boolean; // default: antibiotic
}

const API_URL = import.meta.env.VITE_API_URL;

interface SpecimenData {
  name: string;
  [key: string]: unknown;
}

const ViewSpecimen: React.FC<ViewSpecimenProps> = ({
  name,
  antibiotic = true, // default to antibiotic
}) => {
  const [data, setData] = useState<SpecimenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(null);

    const endpoint = !antibiotic
      ? `${API_URL}/api/bacteria/find-by-name/${encodeURIComponent(name)}`
      : `${API_URL}/api/antibiotics/find-by-name/${encodeURIComponent(name)}`;

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name, antibiotic]);

  if (loading) return <div>Loading specimen...</div>;
  if (error) return <div>Not found: {error}</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>{data.name}</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {Object.entries(data).map(
          ([key, value]) =>
            key !== "name" && (
              <div key={key}>
                <strong>{key}:</strong>{" "}
                {Array.isArray(value)
                  ? value.join(", ")
                  : typeof value === "object"
                  ? JSON.stringify(value)
                  : value?.toString()}
              </div>
            )
        )}
      </pre>
    </div>
  );
};

export default ViewSpecimen;
