# 🌍 AI Trip Planner

An intelligent travel planning application powered by AI. Simply enter your destination, number of days, budget, and travel style—and get a fully personalized trip plan with hotel recommendations and day-by-day itineraries in seconds.

<div align="center">

**[Live Demo](#)** • **[Features](#-features)** • **[Tech Stack](#-tech-stack)** • **[Getting Started](#-getting-started)** • **[Deployment](#-deployment)**

</div>

---

## ✨ Features

- **🤖 AI Trip Generation** - Enter destination & preferences, get a complete trip plan instantly using Groq's Llama AI
- **🏨 Hotel Recommendations** - Curated hotel suggestions with descriptions, ratings, and pricing tiers
- **🗓️ Day-by-Day Itineraries** - Detailed daily schedules with times, activities, and travel duration estimates
- **💰 Budget Tiers** - Cheap, Moderate, or Luxury options with specific hotel and activity recommendations
- **👥 Travel Styles** - Solo, Couple, Family, or Friends—customized suggestions for each traveler type
- **📍 Smart Location Search** - Autocomplete location finder powered by Geoapify
- **💾 Trip History** - Save and revisit all your generated trips (Firebase Firestore)
- **🔐 User Authentication** - Secure login with Google OAuth
- **🌙 Dark Mode** - Beautiful dark/light theme with smooth transitions
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop screens
- **⚡ Fast & Secure** - Built with modern architecture (serverless backend for API security)

---

## 🏗️ Architecture

```
┌─────────────────┐          ┌──────────────────┐          ┌─────────────┐
│   React App     │          │ Vercel Serverless│          │   Firebase  │
│   (Vercel CDN)  │──────────│  Function        │──────────│  (Database) │
└─────────────────┘          │ /api/generateTrip│          └─────────────┘
      (Frontend)             │  (Secure Groq)   │           (Firestore)
                             └──────────────────┘
```

**Key Point:** Your Groq API key is stored securely on Vercel servers and **never exposed to the browser**.

---

## 🚀 Tech Stack

### Frontend
- **React** 19.2 - Modern UI library
- **Vite** 7.2 - Lightning-fast build tool
- **Tailwind CSS** v4 - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Framer Motion** - Smooth animations
- **React Router** v7 - Client-side routing

### Backend & Services
- **Vercel Functions** - Serverless API endpoints (free tier)
- **Groq SDK** - Fast AI inference (Llama 3.1)
- **Firebase** - Authentication & Firestore database
- **Geoapify** - Location autocomplete API

### Tools & DevOps
- **ESLint** - Code linting
- **Vercel** - Hosting & deployment (recommended)

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account (for deployment)

### Local Development

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd "AI Trip Planner"
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env.local` file**

Copy from `.env.example`:
```bash
cp .env.example .env.local
```

Then fill in your keys:
```env
# Firebase Configuration (get from Firebase Console)
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

# Geoapify (free tier available at geoapify.com)
VITE_GEOAPIFY_API_KEY=xxx

# Google OAuth (from Google Cloud Console)
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
```

**4. Start development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📋 Environment Variables Reference

### Frontend Variables
| Variable | Source | Purpose |
|----------|--------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase Console | SDK authentication |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Console | OAuth redirect domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Console | Database/Auth identifier |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Console | Storage identifier |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console | Cloud Messaging |
| `VITE_FIREBASE_APP_ID` | Firebase Console | App identifier |
| `VITE_GEOAPIFY_API_KEY` | Geoapify Dashboard | Location autocomplete |
| `VITE_GOOGLE_CLIENT_ID` | Google Cloud Console | OAuth client |

### Backend Variables (Secure - Vercel Deployment Only)
| Variable | Source | Purpose |
|----------|--------|---------|
| `GROQ_API_KEY` | Groq Console | AI model authentication (server-side only) |

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit: AI Trip Planner"
git push origin main
```

### Step 2: Import Project in Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. Click **"Import"**

### Step 3: Configure Environment Variables
In the Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add all frontend variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GEOAPIFY_API_KEY`
   - `VITE_GOOGLE_CLIENT_ID`

3. **Important:** Add the secure backend variable:
   - `GROQ_API_KEY` - This stays server-side and is never exposed to clients

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 30-60 seconds)
3. Get your live URL (e.g., `https://your-project.vercel.app`)

### Step 5: Update Firebase OAuth (if needed)
If you're using Google OAuth, add your Vercel URL to Firebase:
1. Go to Firebase Console → Authentication → Settings
2. Add your deployed URL to **Authorized Domains**

---

## 🎯 How It Works

1. **User logs in** with Google OAuth
2. **User enters trip details** (destination, days, budget, style)
3. **Frontend sends request** to `/api/generateTrip` (Vercel serverless function)
4. **Groq API (on Vercel)** generates personalized trip plan
5. **Trip data saved** to Firebase Firestore
6. **User sees results** with hotels, itinerary, and budget tips
7. **Trip is saved** and can be revisited anytime

---

## 📁 Project Structure

```
ai-trip-planner/
├── api/                       # Serverless functions (Vercel)
│   └── generateTrip.js        # AI trip generation endpoint
├── public/                    # Static assets
├── shared/                    # Shared utilities
│   └── prompt.js              # AI prompt template
├── src/
│   ├── assets/                # Images, icons
│   ├── components/
│   │   ├── custom/            # Custom components (Header, Hero)
│   │   └── ui/                # shadcn/ui components (Button, etc.)
│   ├── constants/
│   │   └── options.jsx        # Form select options
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication state management
│   ├── create-trip/           # Trip creation page
│   │   └── index.jsx
│   ├── my-trips/              # User's saved trips page
│   │   └── index.jsx
│   ├── view-trip/             # Trip detail view
│   │   ├── index.jsx
│   │   └── components/        # HotelCard, PlaceCard, etc.
│   ├── service/
│   │   ├── aiService.js       # API integration layer
│   │   ├── firebase.js        # Firebase configuration
│   │   └── firebaseService.js # Firestore operations
│   ├── lib/
│   │   └── utils.js           # Utility functions
│   ├── App.jsx                # Main app component
│   └── main.jsx               # App entry point
├── .env                       # Environment variables (not committed)
├── .env.example               # Environment template
├── server.js                  # Local development server
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies & scripts
```

---

## 🔒 Security

- ✅ **Groq API Key Protected**: Stored on Vercel servers, never exposed to browser
- ✅ **Firebase Rules**: Data protected with security rules (user-specific access)
- ✅ **Google OAuth**: Secure authentication via Google
- ✅ **HTTPS Only**: All communication encrypted
- ✅ **No sensitive data** in version control (use `.env.local` and Vercel secrets)

---

## 🚨 Troubleshooting

### API Key Configuration
- Ensure `GROQ_API_KEY` is set in Vercel Environment Variables
- Redeploy after adding environment variables

### Firebase Authentication
- Verify all Firebase credentials are correctly set
- Add your deployment URL to Firebase **Authorized Domains**

### Location Autocomplete
- Confirm `VITE_GEOAPIFY_API_KEY` is valid
- Check API key permissions in Geoapify dashboard

### Performance
- Serverless functions may have ~2-3s cold start on first request
- Subsequent requests are optimized and faster

---

## 📈 Performance
 & Scalability

- **Frontend**: Vercel Edge Network CDN (99.99% uptime SLA)
- **API**: Serverless architecture with auto-scaling
- **Database**: Firebase Firestore with global replication
- **Optimized Bundle**: ~150KB gzipped
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
---

## 💳 Pricing

- **Vercel**: Free tier (up to 100GB bandwidth/month)
- **Groq API**: Free tier (up to reasonable limits)
- **Firebase**: Free tier (up to 1GB storage, 10K reads/writes/day)
- **Geoapify**: Free tier (up to 3,000 requests/day)

Total cost: **$0/month** for typical usage 🎉

---

## 📄 License

MIT License - Feel free to fork, modify, and use this project!

---

## 🤝 Support

Have questions? Issues?
- Check the [Troubleshooting](#-troubleshooting) section
- Open an issue on GitHub
- Check the deployment logs in Vercel dashboard

---

<div align="center">

Built with ❤️ by Nalin using React + Vite + Vercel

[⬆ Back to top](#-ai-trip-planner)

</div>
