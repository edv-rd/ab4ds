const API_URL = import.meta.env.VITE_API_URL;

export const fetchAntibiotics = async () => {
  try {
    const response = await fetch(`${API_URL}/api/antibiotics`);
    if (!response.ok) {
      throw new Error("Failed to fetch antibiotics");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching antibiotics:", error);
    throw error;
  }
};
