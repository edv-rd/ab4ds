const API_URL = import.meta.env.VITE_API_URL;

export const fetchBacteria = async () => {
  try {
    const response = await fetch(`${API_URL}/api/bacteria`);
    if (!response.ok) {
      throw new Error("Failed to fetch bacteria");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bacteria:", error);
    throw error;
  }
};
