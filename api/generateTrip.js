import Groq from "groq-sdk";
import { AI_PROMPT_TEMPLATE } from "../shared/prompt.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
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
