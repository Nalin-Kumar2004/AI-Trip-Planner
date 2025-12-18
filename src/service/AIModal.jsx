import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * AI Prompt for Trip Generation
 * =============================
 * 
 * IMPORTANT LESSON:
 * -----------------
 * AI models (Llama, GPT, etc.) CANNOT provide accurate coordinates!
 * They generate plausible-looking numbers but they're essentially random.
 * 
 * Solution: We ask AI for place NAMES only, then let Google Maps
 * find the real location when user clicks.
 * 
 * What AI is good at:
 * - Suggesting popular places to visit
 * - Creating day-by-day itineraries
 * - Budget tips and travel advice
 * 
 * What AI is BAD at:
 * - Exact coordinates (hallucinated!)
 * - Verifying if places exist
 * - Real-time data (prices, availability)
 */
const AI_PROMPT = `Generate a travel plan ONLY as valid JSON (no markdown, no extra text) for:
Location: {location}
Days: {totalDays}
Travelers: {traveler}
Budget: {budget}

CRITICAL INSTRUCTIONS:
1. Suggest REAL, FAMOUS, WELL-KNOWN hotels and tourist places in {location}
2. Focus on popular landmarks, attractions, and reputable hotels
3. Include the full address for hotels so users can find them on Google Maps
4. Be specific with place names (e.g., "Taj Mahal, Agra" not just "famous monument")

Return EXACTLY this JSON structure:
{
  "tripDetails": {
    "location": "{location}",
    "duration": "{totalDays} days",
    "travelers": "{traveler}",
    "budget": "{budget}"
  },
  "hotelOptions": [
    {
      "name": "Famous Hotel Name",
      "address": "Full address with city and state",
      "price": "$XX-$YY per night",
      "rating": "4.5 stars",
      "description": "Brief description of this hotel"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "schedule": [
        {
          "time": "9:00 AM - 12:00 PM",
          "placeName": "Famous Place Name, City",
          "details": "What to do here and why it's worth visiting",
          "ticketPricing": "Free / $XX per person",
          "travelTime": "15 minutes from previous location"
        }
      ]
    }
  ],
  "budgetTips": [
    "Specific money-saving tip for {location}",
    "Another practical tip for {budget} budget travelers"
  ]
}

Return valid JSON only, no markdown or extra text.`;

export async function chatSession(fieldData) {
  /**
   * Replace placeholders with actual user input
   * Uses replaceAll because {location} appears multiple times
   */
  const prompt = AI_PROMPT
    .replaceAll("{location}", fieldData.location)
    .replaceAll("{totalDays}", fieldData.noOfDays)
    .replaceAll("{traveler}", fieldData.traveler)
    .replaceAll("{budget}", fieldData.budget);

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,  // Lower = more factual, less creative (reduces hallucinations)
  });

  let text = response.choices[0].message.content;
  
  // Remove markdown code blocks if present
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(text);
}

