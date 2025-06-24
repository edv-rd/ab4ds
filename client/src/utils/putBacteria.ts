const API_URL = import.meta.env.VITE_API_URL;

import type { Bacteria } from "../types";

export const putBacteria = async (bacteria: Bacteria) => {
  try {
    const response = await fetch(`${API_URL}/api/bacteria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bacteria),
    });
    if (!response.ok) {
      throw new Error("Failed to add bacteria");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding bacteria:", error);
    throw error;
  }
};
