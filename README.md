# 🌍 AI Trip Planner

A modern, AI-powered travel planning application built with React, featuring a beautiful Linear/Vercel-inspired design.

## ✨ Features

- 🤖 **AI-Powered Itineraries** - Generate personalized trip plans in seconds using Groq AI
- 🏨 **Smart Hotel Recommendations** - Get curated hotel suggestions with ratings and prices
- 📍 **Location Search** - Intelligent destination search with Geoapify autocomplete
- 💰 **Budget-Friendly** - Choose from Cheap, Moderate, or Luxury budget tiers
- 👥 **Multiple Travel Styles** - Solo, Couple, Family, or Friends travel options
- 💾 **Save & Sync** - All trips saved to Firebase for access anywhere
- 🌙 **Dark Mode** - Beautiful light/dark theme toggle
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

## 🚀 Tech Stack

- **Frontend**: React 19.2.0 + Vite
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui (Radix Primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Google OAuth
- **Database**: Firebase Firestore
- **AI**: Groq SDK with Llama model
- **Maps**: Geoapify Geocoding API

## 📦 Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd AI Trip Planner
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
VITE_GEOAPIFY_API_KEY=your_geoapify_key
VITE_GROQ_API_KEY=your_groq_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Run development server
```bash
npm run dev
```

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📝 Environment Variables

Required environment variables:
- `VITE_GEOAPIFY_API_KEY` - For location autocomplete
- `VITE_GROQ_API_KEY` - For AI trip generation
- `VITE_GOOGLE_CLIENT_ID` - For Google OAuth authentication

Firebase config is included in the code (safe for frontend).


## 📄 License

MIT License - feel free to use this project for your portfolio or personal use!

---

Built with ❤️ using React + Vite

