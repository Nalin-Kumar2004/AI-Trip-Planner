import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Globe, Calendar, ArrowRight, Plane, Map, Star } from 'lucide-react'

function Hero() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Gradient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="
            inline-flex items-center gap-2
            bg-white/50 dark:bg-white/5
            backdrop-blur-md
            border border-zinc-200 dark:border-white/10
            rounded-full
            px-4 py-2
            text-sm
          ">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              Powered by AI • Plan trips in minutes
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-bold
            text-zinc-900 dark:text-zinc-100
            leading-tight
            mb-6
          ">
            Your Next
            <br />
            <span className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Adventure
            </span>
            <br />
            Starts Here
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              text-lg sm:text-xl md:text-2xl
              text-zinc-600 dark:text-zinc-400
              max-w-3xl mx-auto
              leading-relaxed
            "
          >
            AI-powered travel planning that creates personalized itineraries
            <br className="hidden sm:block" />
            tailored to your style, budget, and dreams.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/create-trip">
            <Button className="
              bg-linear-to-r from-orange-500 to-pink-500
              hover:from-orange-600 hover:to-pink-600
              text-white
              rounded-full
              px-8 py-6
              text-lg
              font-semibold
              cursor-pointer
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200
              border-0
              shadow-lg
              shadow-orange-500/25
              group
            ">
              Start Planning Free
              <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/my-trips">
            <Button
              variant="outline"
              className="
                rounded-full
                px-8 py-6
                text-lg
                cursor-pointer
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                border-zinc-300 dark:border-white/20
                backdrop-blur-sm
              "
            >
              View My Trips
            </Button>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Globe,
              title: "Smart Destinations",
              description: "AI suggests perfect locations based on your preferences and travel style"
            },
            {
              icon: Calendar,
              title: "Day-by-Day Plans",
              description: "Get detailed itineraries with activities, hotels, and travel times"
            },
            {
              icon: Map,
              title: "Budget Friendly",
              description: "Choose your budget level and get recommendations that fit perfectly"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="
                bg-white/50 dark:bg-white/5
                backdrop-blur-md
                border border-zinc-200 dark:border-white/10
                rounded-3xl
                p-8
                hover:border-zinc-300 dark:hover:border-white/20
                hover:shadow-xl
                transition-all duration-300
                cursor-pointer
                group
              "
            >
              <div className="
                w-14 h-14
                bg-linear-to-br from-orange-500 to-pink-500
                rounded-2xl
                flex items-center justify-center
                mb-4
                group-hover:scale-110
                transition-transform duration-300
              ">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Trusted by travelers worldwide
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-20 hidden lg:block"
      >
        <Plane className="w-16 h-16 text-orange-500/30" />
      </motion.div>

      {/* How It Works Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Plan your perfect trip in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Tell Us Your Preferences',
              description: 'Share your destination, dates, budget, and travel style. Our AI understands what makes your trip special.',
              icon: '✨'
            },
            {
              step: '02',
              title: 'AI Crafts Your Itinerary',
              description: 'In seconds, get a personalized day-by-day plan with hotels, activities, and optimal timing.',
              icon: '🤖'
            },
            {
              step: '03',
              title: 'Enjoy Your Adventure',
              description: 'Access your itinerary anytime, with all details organized and ready for your journey.',
              icon: '✈️'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line (hidden on mobile) */}
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-linear-to-r from-orange-500/30 to-transparent" />
              )}
              
              <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-sm font-mono text-orange-500 font-semibold mb-2">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '10K+', label: 'Trips Planned' },
              { number: '500+', label: 'Destinations' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'AI Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Deep Dive */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Everything You Need for the Perfect Trip
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            AI-powered features that take the stress out of travel planning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: '🏨',
              title: 'Smart Hotel Selection',
              description: 'Get curated hotel recommendations with ratings, prices, and booking links - all matched to your budget.'
            },
            {
              icon: '🗓️',
              title: 'Optimized Scheduling',
              description: 'Every day planned with perfect timing - activities, travel time, and breaks automatically calculated.'
            },
            {
              icon: '🎯',
              title: 'Personalized Activities',
              description: 'Discover activities tailored to your interests, from adventure to relaxation, culture to cuisine.'
            },
            {
              icon: '💰',
              title: 'Budget Management',
              description: 'Choose your budget tier and get recommendations that fit - no surprises or overspending.'
            },
            {
              icon: '📍',
              title: 'Location Details',
              description: 'Every place comes with descriptions, addresses, and estimated costs - all in one place.'
            },
            {
              icon: '💾',
              title: 'Save & Access Anywhere',
              description: 'All your trips saved securely - access them anytime, anywhere, from any device.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trip Types Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Perfect for Every Journey
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Whether you're flying solo or traveling with family
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: '🏖️',
              title: 'Weekend Getaways',
              description: 'Quick escapes planned perfectly - maximize every hour of your short trip.'
            },
            {
              emoji: '👨‍👩‍👧‍👦',
              title: 'Family Vacations',
              description: 'Kid-friendly activities, family hotels, and stress-free scheduling for all ages.'
            },
            {
              emoji: '🎒',
              title: 'Solo Adventures',
              description: 'Discover hidden gems, meet locals, and create your own unique journey.'
            },
            {
              emoji: '💑',
              title: 'Romantic Escapes',
              description: 'Intimate experiences, scenic spots, and unforgettable moments together.'
            },
            {
              emoji: '🎉',
              title: 'Group Travel',
              description: 'Plan for friends, reunions, or celebrations with activities everyone loves.'
            },
            {
              emoji: '💼',
              title: 'Business + Leisure',
              description: 'Mix work with exploration - make the most of your business trips.'
            }
          ].map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="text-5xl mb-4">{type.emoji}</div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {type.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Loved by Travelers
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            See what our users say about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah Chen',
              role: 'Digital Nomad',
              avatar: '👩‍💼',
              text: 'This tool saved me hours of research. My Tokyo trip was perfectly planned in under 5 minutes!',
              rating: 5
            },
            {
              name: 'Mike Johnson',
              role: 'Family Traveler',
              avatar: '👨‍👩‍👧',
              text: 'Finally, a planner that understands family travel. The activities were perfect for our kids.',
              rating: 5
            },
            {
              name: 'Emma Rodriguez',
              role: 'Adventure Seeker',
              avatar: '🧗‍♀️',
              text: 'The AI suggested spots I never would have found. Best hiking trip ever!',
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered stress-free trip planning
            </p>
            <Link to="/create-trip">
              <Button
                className="bg-white text-orange-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Start Planning Your Adventure
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Button>
            </Link>
            <p className="text-white/70 text-sm mt-4">
              No credit card required • Takes less than 2 minutes
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  )
}

export default Hero