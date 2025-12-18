/**
 * Firebase Service - CRUD Operations for Trips
 * =============================================
 * 
 * CRUD = Create, Read, Update, Delete
 * This file handles all database operations with Firestore.
 * 
 * Firestore Structure:
 * --------------------
 * trips (collection)
 *   └── {tripId} (document)
 *         ├── tripData: { AI-generated trip plan }
 *         ├── userSelection: { location, days, budget, traveler }
 *         ├── userId: "google_user_id"
 *         ├── userEmail: "user@email.com"
 *         └── createdAt: Timestamp
 */

import { db } from "./firebase";
import { 
  collection,     // Reference to a collection (like a table)
  addDoc,         // CREATE - Add new document
  getDocs,        // READ - Get multiple documents
  getDoc,         // READ - Get single document
  doc,            // Reference to a specific document
  query,          // Build a query with filters
  where,          // Filter condition (like SQL WHERE)
  deleteDoc,      // DELETE - Remove document
  serverTimestamp // Auto-generated timestamp from server
} from "firebase/firestore";

// Collection name - like a table name in SQL
const TRIPS_COLLECTION = "trips";

/**
 * CREATE - Save a new trip to Firestore
 * -------------------------------------
 * Called after AI generates a trip plan.
 * 
 * @param {Object} tripData - The AI-generated trip (hotels, itinerary, etc.)
 * @param {Object} userSelection - What user selected in the form
 * @param {string} userId - Google user ID (to fetch only their trips later)
 * @param {string} userEmail - User's email (for reference)
 * @returns {string} - Auto-generated document ID (like "zRZF8nXAihENi8AupEgG")
 */
export const saveTrip = async (tripData, userSelection, userId, userEmail) => {
  try {
    // addDoc creates a new document with auto-generated ID
    const docRef = await addDoc(collection(db, TRIPS_COLLECTION), {
      tripData: tripData,
      userSelection: userSelection,
      userId: userId,
      userEmail: userEmail,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving trip:", error);
    throw error;
  }
};

/**
 * READ - Get all trips for a specific user
 * ----------------------------------------
 * Used on "My Trips" page to show only trips belonging to logged-in user.
 * 
 * @param {string} userId - Google user ID
 * @returns {Array} - Array of trip objects with their IDs
 */
export const getUserTrips = async (userId) => {
  try {
    // Build query: SELECT * FROM trips WHERE userId == {userId}
    const q = query(
      collection(db, TRIPS_COLLECTION),
      where("userId", "==", userId)
    );
    
    // Execute query
    const querySnapshot = await getDocs(q);
    
    // Convert Firestore docs to plain objects
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() });  // Spread doc data + add ID
    });
    
    // Sort by date (newest first) - done client-side to avoid Firestore index
    trips.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB - dateA;  // Descending order
    });
    
    return trips;
  } catch (error) {
    console.error("Error getting user trips:", error);
    throw error;
  }
};

/**
 * READ - Get a single trip by its ID
 * ----------------------------------
 * Used when viewing trip details page (/trip/:tripId)
 * 
 * @param {string} tripId - The document ID from URL
 * @returns {Object} - The complete trip object
 */
export const getTripById = async (tripId) => {
  try {
    // doc() creates reference to specific document
    const docRef = doc(db, TRIPS_COLLECTION, tripId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Trip not found");
    }
  } catch (error) {
    console.error("Error getting trip:", error);
    throw error;
  }
};

/**
 * DELETE - Remove a trip by ID
 * ----------------------------
 * Called when user clicks delete button on My Trips page
 * 
 * @param {string} tripId - The document ID to delete
 */
export const deleteTrip = async (tripId) => {
  try {
    await deleteDoc(doc(db, TRIPS_COLLECTION, tripId));
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};
