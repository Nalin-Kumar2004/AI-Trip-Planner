import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserTrips, deleteTrip } from '@/service/firebaseService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Trash2, Plus, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MyTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        const userTrips = await getUserTrips(user.id);
        setTrips(userTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user]);

  const handleDelete = async (e, tripId) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this trip?')) return;
    
    try {
      await deleteTrip(tripId);
      setTrips(trips.filter(trip => trip.id !== tripId));
      toast.success('Trip deleted successfully');
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-zinc-900">Please sign in to view your trips</h2>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-zinc-600"
        >
          Loading your adventures...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
            My Trips ✈️
          </h1>
          <p className="text-zinc-600 text-lg">
            {trips.length} {trips.length === 1 ? 'adventure' : 'adventures'} planned
          </p>
        </motion.div>
      
      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20"
        >
          <div className="
            max-w-md mx-auto
            bg-white/50
            backdrop-blur-md
            border border-zinc-200
            rounded-3xl
            p-12
          ">
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">
              No trips yet
            </h3>
            <p className="text-zinc-600 mb-8">
              Start planning your next adventure with AI
            </p>
            <Link to="/create-trip">
              <Button className="
                bg-linear-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600
                text-white
                rounded-full
                px-8 py-6
                text-lg
                cursor-pointer
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                border-0
              ">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Trip
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link 
                to={`/view-trip/${trip.id}`}
                className="
                  block
                  bg-white/50
                  backdrop-blur-md
                  border border-zinc-200
                  rounded-2xl
                  overflow-hidden
                  hover:shadow-xl
                  hover:border-zinc-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-300
                  cursor-pointer
                  relative
                  group
                "
              >
                {/* Gradient Header */}
                <div className="h-32 bg-linear-to-br from-orange-400 via-pink-400 to-purple-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                  
                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDelete(e, trip.id)}
                    className="
                      absolute top-3 right-3
                      w-10 h-10
                      bg-white/20 backdrop-blur-md
                      border border-white/30
                      rounded-full
                      flex items-center justify-center
                      text-white
                      opacity-0 group-hover:opacity-100
                      hover:bg-red-500
                      transition-all duration-200
                      z-10
                      cursor-pointer
                    "
                    title="Delete trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                  
                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="
                      bg-white/20 backdrop-blur-md
                      border border-white/30
                      rounded-full
                      px-4 py-2
                      flex items-center gap-2
                    ">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-white font-semibold text-sm">
                        {trip.tripData?.tripDetails?.location || trip.userSelection?.location || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-zinc-900">
                    {trip.tripData?.tripDetails?.location || trip.userSelection?.location || 'Trip'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-zinc-600">
                      <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{trip.userSelection?.noOfDays} Days</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-zinc-600">
                      <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{trip.userSelection?.budget}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-zinc-600">
                      <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{trip.userSelection?.traveler}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-zinc-200">
                    <p className="text-xs text-zinc-400">
                      {trip.createdAt?.toDate?.()?.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) || 'Recently created'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default MyTrips;
