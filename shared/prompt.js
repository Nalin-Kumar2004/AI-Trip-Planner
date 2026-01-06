export const AI_PROMPT_TEMPLATE = `Generate a travel plan ONLY as valid JSON (no markdown, no extra text) for:
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
