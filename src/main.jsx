import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import MyTrips from './my-trips/index.jsx'
import ViewTrip from './view-trip/index.jsx' // Styled trip view page
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'

/**
 * Layout Component
 * ----------------
 * This wraps all pages with common elements (Header, Toaster).
 * 
 * Why we need this:
 * - Header uses <Link> from react-router-dom
 * - <Link> MUST be inside RouterProvider to work
 * - Before: Header was OUTSIDE RouterProvider → Error!
 * - Now: Header is INSIDE via this Layout → Works!
 * 
 * <Outlet /> is where child routes render (like a placeholder)
 * Think of it as: Layout = Header + {currentPage}
 */
function Layout() {
  return (
    <>
      <Header />
      <Toaster />
      {/* Outlet renders the current route's component */}
      {/* If URL is "/my-trips", Outlet shows <MyTrips /> */}
      {/* If URL is "/", Outlet shows <App /> */}
      <Outlet />
    </>
  )
}

/**
 * Router Configuration
 * --------------------
 * Defines which component shows for each URL path.
 * 
 * Structure:
 * - All routes are children of Layout (so they all get Header)
 * - :tripId is a dynamic parameter (like /trip/abc123)
 */
const router = createBrowserRouter([
  {
    element: <Layout />,  // Parent wrapper for all routes
    children: [
      {
        path: '/',              // Homepage
        element: <App />
      },
      {
        path: '/create-trip',   // Trip creation form
        element: <CreateTrip />
      },
      {
        path: '/view-trip/:tripId',  // Trip details page (styled version)
        element: <ViewTrip />
      },
      {
        path: '/my-trips',      // List of user's saved trips
        element: <MyTrips />
      }
    ]
  }
])

/**
 * App Entry Point
 * ---------------
 * This is where React mounts to the DOM.
 * 
 * Provider Hierarchy (outer to inner):
 * 1. StrictMode - Development warnings/checks
 * 2. GoogleOAuthProvider - Enables Google Sign-In across app
 * 3. AuthProvider - Our custom context for user state (login/logout)
 * 4. RouterProvider - Enables URL-based navigation
 * 
 * Why this order matters:
 * - AuthProvider needs GoogleOAuthProvider (for login)
 * - RouterProvider needs AuthProvider (routes check if user is logged in)
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)

export { router }
