import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { toast } from 'sonner';
import { generateTrip } from '@/service/aiService';
import { useAuth } from '@/context/AuthContext';
import { saveTrip } from '@/service/firebaseService';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Users, Sparkles } from 'lucide-react';

function CreateTrip() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { location, budget, traveler, noOfDays } = formData;

  function onPlaceSelect(value) {
    const locationName = value?.properties?.formatted || value?.properties?.name || value?.properties?.city || '';
    handleInputChange('location', locationName);
  }

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateTripPlan = useCallback(async () => {
    setLoading(true);
    try {
      const response = await generateTrip(formData);
      const tripId = await saveTrip(
        response,
        formData,
        user.id,
        user.email
      );
      toast.success("Trip saved successfully!");
      navigate(`/view-trip/${tripId}`);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error("Failed to generate trip plan");
    } finally {
      setLoading(false);
    }
  }, [formData, navigate, user]);

  useEffect(() => {
    if (user && location && budget && traveler && noOfDays) {
      generateTripPlan();
    }
  }, [user, location, budget, traveler, noOfDays, generateTripPlan]);

  const OnGenerateTrip = () => {
    if (!location || !budget || !traveler || !noOfDays) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!user) {
      toast.error('Please sign in to generate a trip');
      login();
      return;
    }
    generateTripPlan();
  };

  return (
    <div className='min-h-screen bg-zinc-50'>
      {/* Form Content */}
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <h2 className='font-bold text-3xl text-zinc-900 mb-2'>
              Tell us your travel preferences 🏕️🌴
            </h2>
            <p className='text-zinc-600 text-lg'>
              Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>
          </motion.div>

          <div className='flex flex-col gap-6'>
            
            {/* Location Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-linear-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center'>
                  <MapPin className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-zinc-900'>What is destination of choice?</h2>
                </div>
              </div>
              
              <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
                <div className='geoapify-autocomplete-wrapper'>
                  <GeoapifyGeocoderAutocomplete
                    placeholder="Search for a city or destination..."
                    placeSelect={onPlaceSelect}
                    filterByTypes={['city', 'state', 'country']}
                    skipDetails={false}
                  />
                </div>
              </GeoapifyContext>
              <p className='text-sm text-amber-600 mt-3 flex items-start gap-2'>
                <span className='text-base'>⚠️</span>
                <span>Please select a destination from the autocomplete suggestions only. Random text entries will not generate a trip.</span>
              </p>
            </motion.div>

            {/* Days Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-linear-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center'>
                  <Calendar className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-zinc-900'>How many days are you planning your trip?</h2>
                </div>
              </div>
              
              <input
                placeholder='Ex.3'
                type="number"
                min="1"
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                onWheel={(e) => e.target.blur()}
                className="w-full border-2 border-zinc-200 bg-white rounded-xl px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
              />
            </motion.div>

            {/* Budget Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-linear-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center'>
                  <DollarSign className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-zinc-900'>What is Your Budget?</h2>
                </div>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                {SelectBudgetOptions.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`relative p-5 border-2 cursor-pointer rounded-xl transition-all duration-300 bg-white
                      ${formData?.budget == item.title 
                        ? 'border-orange-500 shadow-lg shadow-orange-500/20' 
                        : 'border-zinc-200 hover:border-orange-300 hover:shadow-md'}`}
                  >
                    {formData?.budget == item.title && (
                      <div className='absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                    )}
                    <h2 className='text-4xl mb-2'>{item.icon}</h2>
                    <h2 className='font-bold text-lg text-zinc-900 mb-1'>{item.title}</h2>
                    <h2 className='text-sm text-zinc-600'>{item.desc}</h2>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Travelers Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-linear-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center'>
                  <Users className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-zinc-900'>Who do you plan on traveling with on your next adventure?</h2>
                </div>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                {SelectTravelesList.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('traveler', item.people)}
                    className={`relative p-5 border-2 cursor-pointer rounded-xl transition-all duration-300 bg-white
                      ${formData?.traveler == item.people 
                        ? 'border-orange-500 shadow-lg shadow-orange-500/20' 
                        : 'border-zinc-200 hover:border-orange-300 hover:shadow-md'}`}
                  >
                    {formData?.traveler == item.people && (
                      <div className='absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                    )}
                    <h2 className='text-4xl mb-2'>{item.icon}</h2>
                    <h2 className='font-bold text-lg text-zinc-900 mb-1'>{item.title}</h2>
                    <h2 className='text-sm text-zinc-600'>{item.desc}</h2>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='mt-8 flex justify-end'
          >
            <Button 
              onClick={OnGenerateTrip} 
              disabled={loading}
              className='bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 hover:opacity-90 text-white px-10 py-5 text-base rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              {loading ? (
                <>
                  <Spinner className="mr-2 w-4 h-4" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  <span>Generate Trip</span>
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
