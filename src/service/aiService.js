/**
 * AI Service - Vercel Serverless Integration
 * ==========================================
 *
 * Handles API calls to the backend serverless function (/api/generateTrip).
 * API keys are kept secure on the server and never exposed to the browser.
 */

export async function generateTrip(tripData) {
  const response = await fetch("/api/generateTrip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: tripData.location,
      noOfDays: tripData.noOfDays,
      traveler: tripData.traveler,
      budget: tripData.budget,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Failed to generate trip. Please try again.");
  }

  return data.tripData;
}

// Legacy export for backward compatibility
export const chatSession = generateTrip;
