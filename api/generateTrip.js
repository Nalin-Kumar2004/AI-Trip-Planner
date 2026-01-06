import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const AI_PROMPT_TEMPLATE = `Generate a travel plan ONLY as valid JSON (no markdown, no extra text) for:
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { location, noOfDays, traveler, budget } = req.body || {};

  if (!location || !noOfDays || !traveler || !budget) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = AI_PROMPT_TEMPLATE
    .replaceAll("{location}", location)
    .replaceAll("{totalDays}", noOfDays)
    .replaceAll("{traveler}", traveler)
    .replaceAll("{budget}", budget);

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    let text = response.choices[0].message.content;
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const tripData = JSON.parse(text);

    return res.status(200).json({ success: true, tripData });
  } catch (error) {
    console.error("Error generating trip:", error);

    if (error instanceof SyntaxError) {
      return res
        .status(502)
        .json({ error: "AI returned invalid JSON. Please try again." });
    }

    return res.status(500).json({ error: "Failed to generate trip" });
  }
}
