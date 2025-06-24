const API_URL = import.meta.env.VITE_API_URL;

import type { Antibiotic } from "../types";

export const putAntibiotic = async (antibiotic: Antibiotic) => {
  try {
    const response = await fetch(`${API_URL}/api/antibiotics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(antibiotic),
    });
    if (!response.ok) {
      throw new Error("Failed to add antibiotic");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding antibiotic:", error);
    throw error;
  }
};
