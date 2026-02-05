import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Globe, Calendar, ArrowRight, Star, Compass, Navigation, Plane, Palmtree, MapPin, Sparkles, Award, Target, Gift, Clock } from 'lucide-react'

// Scroll-Progress Step Card Component
const StepCard = ({ step, title, description, highlight, index, activeStep, isCompleted }) => {
  const isActive = activeStep === index
  const isPast = activeStep > index
  const isFuture = activeStep < index
  
  return (
    <div className="group relative">
      {/* Connector Line Segment */}
      {index < 2 && (
        <div className="absolute left-[39px] top-[88px] w-[3px] h-[calc(100%+40px)] -translate-x-1/2">
          {/* Background line */}
          <div className="absolute inset-0 bg-zinc-200 rounded-full" />
          {/* Fill line - based on completion */}
          <div 
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-orange-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ height: isPast || isActive ? '100%' : '0%' }}
          />
        </div>
      )}
      
      <div
        className={`
          relative
          bg-white
          border-2 
          ${isActive ? 'border-orange-500/50 shadow-2xl shadow-orange-500/20' : isPast ? 'border-orange-500/30' : 'border-zinc-200/80'}
          rounded-[28px]
          p-7 pl-24
          shadow-xl shadow-zinc-200/50
          transition-all duration-500 ease-out
          cursor-pointer
          hover:shadow-2xl hover:-translate-y-1
          ${isActive ? 'scale-100' : 'scale-[0.98]'}
          ${isFuture ? 'opacity-50' : 'opacity-100'}
        `}
      >
        {/* Gradient Number Circle */}
        <div 
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
            transition-all duration-500 ease-out
            ${isActive ? 'scale-110' : isPast ? 'scale-100' : 'scale-90'}
          `}
        >
          {/* Outer glow ring - only when active */}
          <div 
            className={`
              absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 blur-lg
              transition-all duration-500
              ${isActive ? 'opacity-60 scale-125' : 'opacity-0 scale-100'}
            `}
          />
          
          {/* Main number container */}
          <div className={`
            relative w-[78px] h-[78px] rounded-2xl 
            ${isPast || isActive ? 'bg-gradient-to-br from-orange-500 via-orange-500 to-pink-500' : 'bg-gradient-to-br from-zinc-300 to-zinc-400'}
            flex items-center justify-center
            shadow-2xl
            ${isActive ? 'shadow-orange-500/50 ring-4 ring-orange-500/20' : isPast ? 'shadow-orange-500/30' : 'shadow-zinc-300/50'}
            transition-all duration-500
          `}>
            {/* Inner gradient overlay for depth */}
            <div className={`
              absolute inset-[3px] rounded-xl opacity-80 transition-all duration-500
              ${isPast || isActive ? 'bg-gradient-to-br from-orange-400 to-pink-500' : 'bg-gradient-to-br from-zinc-200 to-zinc-300'}
            `} />
            
            {/* The Number */}
            <span className={`
              relative text-4xl font-black drop-shadow-lg transition-colors duration-500
              ${isPast || isActive ? 'text-white' : 'text-zinc-500'}
            `} style={{ fontFamily: 'system-ui' }}>
              {step}
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
            
            {/* Checkmark for completed steps */}
            {isPast && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Active glow background */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/5 to-transparent rounded-[28px]
            transition-opacity duration-500
            ${isActive ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        <div className="relative">
          {/* Step Badge + Title */}
          <div className="flex items-center gap-3 mb-3">
            <span 
              className={`
                text-xs font-bold px-3 py-1.5 rounded-full
                transition-all duration-500
                ${isActive ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white scale-105' : isPast ? 'bg-orange-100 text-orange-600' : 'bg-zinc-100 text-zinc-500'}
              `}
            >
              Step {step}
            </span>
            <h3 className={`
              text-xl font-bold transition-colors duration-500
              ${isActive ? 'text-zinc-900' : isPast ? 'text-zinc-700' : 'text-zinc-400'}
            `}>
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <p className={`
            text-[15px] leading-relaxed mb-3 transition-colors duration-500
            ${isActive ? 'text-zinc-600' : isPast ? 'text-zinc-500' : 'text-zinc-400'}
          `}>
            {description}
          </p>
          
          {/* Time highlight tag */}
          <span className={`
            inline-flex items-center gap-2 text-sm font-semibold transition-all duration-500
            ${isActive ? 'text-orange-600' : isPast ? 'text-green-600' : 'text-zinc-400'}
          `}>
            <span 
              className={`
                w-2 h-2 rounded-full transition-all duration-500
                ${isActive ? 'bg-orange-500 animate-pulse' : isPast ? 'bg-green-500' : 'bg-zinc-300'}
              `}
            />
            {isPast ? '✓ Done' : highlight}
          </span>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  
  // Ref for the How It Works section
  const howItWorksRef = useRef(null)
  
  // Track scroll progress within the How It Works section
  const { scrollYProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start center", "end center"]
  })
  
  // Update active step based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.33) {
      setActiveStep(0)
    } else if (progress < 0.66) {
      setActiveStep(1)
    } else {
      setActiveStep(2)
    }
  })
  
  const rotatingWords = [
    { text: 'in Seconds', color: '#f97316' }, // vibrant orange - matches CTA
    { text: 'Effortlessly', color: '#fb7185' }, // coral rose - warm & inviting
    { text: 'With AI', color: '#f43f5e' }, // rose - energetic
    { text: 'Instantly', color: '#ec4899' }, // hot pink - matches gradient
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2000) // Change word every 2 seconds - faster so users see it
    
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div 
      className="relative min-h-screen bg-zinc-50 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Refined Glass Morphism Background */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50">
        {/* Subtle glass blob - top left */}
        <motion.div
          className="absolute top-10 left-10 w-[280px] h-[280px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.15) 0%, rgba(236,72,153,0.1) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: 'inset 0 0 60px rgba(255,255,255,0.1)',
          }}
          animate={{
            x: [0, 15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Small glass accent - top right */}
        <motion.div
          className="absolute top-20 right-32 w-[200px] h-[200px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(244,63,94,0.08) 100%)',
            backdropFilter: 'blur(30px)',
            boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1)',
          }}
          animate={{
            x: [0, -12, 0],
            y: [0, 18, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Medium glass blob - bottom left */}
        <motion.div
          className="absolute bottom-32 left-1/4 w-[240px] h-[240px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(251,113,133,0.14) 0%, rgba(251,146,60,0.1) 100%)',
            backdropFilter: 'blur(35px)',
            boxShadow: 'inset 0 0 50px rgba(255,255,255,0.12)',
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Elegant floating accent - right side */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[180px] h-[180px] rounded-full hidden lg:block"
          style={{
            background: 'radial-gradient(circle, rgba(254,215,170,0.2) 0%, rgba(251,146,60,0.08) 100%)',
            backdropFilter: 'blur(25px)',
            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.15)',
          }}
          animate={{
            x: [0, -10, 0],
            y: [0, 12, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tiny sparkle accents */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Cursor Glow Effect - more subtle */}
        <div 
          className="pointer-events-none absolute w-[350px] h-[350px] rounded-full opacity-15 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, rgba(236,72,153,0.15) 40%, transparent 70%)',
            filter: 'blur(50px)',
            left: mousePosition.x - 175,
            top: mousePosition.y - 250,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      {/* Chill Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Plane */}
        <motion.div
          className="absolute top-[15%] right-[10%] hidden md:block"
          animate={{
            y: [0, -15, 0],
            rotate: [-12, -8, -12]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Plane className="w-10 h-10 text-orange-400/40" />
        </motion.div>

        {/* Floating Palm Tree - Left */}
        <motion.div
          className="absolute bottom-[20%] left-[8%] hidden lg:block"
          animate={{
            y: [0, 10, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Palmtree className="w-12 h-12 text-emerald-400/30" />
        </motion.div>

        {/* Floating Map Pin */}
        <motion.div
          className="absolute top-[35%] left-[12%] hidden md:block"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MapPin className="w-8 h-8 text-pink-400/35" />
        </motion.div>

        {/* Another Floating Palm - Right */}
        <motion.div
          className="absolute bottom-[30%] right-[6%] hidden lg:block"
          animate={{
            y: [0, 12, 0],
            rotate: [5, -3, 5]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Palmtree className="w-10 h-10 text-emerald-500/25" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
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
            text-zinc-900
            leading-[1.05]
            mb-6
          " style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
            Plan Your Perfect Trip<br />
            <span className="inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[350px] lg:min-w-[400px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  className="inline-block font-bold"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    color: rotatingWords[currentWordIndex].color
                  }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ 
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1], // smooth easing
                  }}
                >
                  {rotatingWords[currentWordIndex].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              text-lg md:text-xl
              text-zinc-600
              max-w-2xl mx-auto
              leading-relaxed
            "
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
          >
            Create personalized day-by-day itineraries with hotels, activities, 
            and hidden gems — perfectly tailored to your style and budget.
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
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600
                text-white
                rounded-full
                px-8 py-6
                text-lg
                font-semibold
                cursor-pointer
                transition-all duration-300
                border-0
                shadow-xl
                shadow-orange-500/30
                hover:shadow-2xl
                hover:shadow-orange-500/40
                group
              ">
                Start Planning Free
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Sparkles,
              title: "AI-Powered Planning",
              description: "Advanced AI analyzes millions of travel data points to craft your perfect itinerary",
              gradient: 'from-orange-500 via-pink-500 to-rose-500'
            },
            {
              icon: Calendar,
              title: "Day-by-Day Schedules",
              description: "Detailed plans with optimized timing, activities, and travel routes",
              gradient: 'from-pink-500 via-rose-500 to-red-500'
            },
            {
              icon: Globe,
              title: "Any Budget, Any Style",
              description: "From budget backpacking to luxury escapes — get recommendations that fit",
              gradient: 'from-violet-500 via-purple-500 to-fuchsia-500'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="
                bg-white/70
                backdrop-blur-xl
                border border-zinc-200/50
                rounded-3xl
                p-8
                hover:bg-white/90
                hover:border-orange-500/30
                hover:shadow-2xl hover:shadow-orange-500/10
                hover:-translate-y-2
                transition-all duration-300 ease-out
                will-change-transform
                group
                cursor-pointer
              "
            >
              {/* Premium Icon Container */}
              <div className={`
                relative w-14 h-14 rounded-2xl
                bg-gradient-to-br ${feature.gradient}
                flex items-center justify-center
                mb-5
                group-hover:scale-110 group-hover:rotate-3
                transition-all duration-300 ease-out
                shadow-lg
              `}>
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                <feature.icon className="w-7 h-7 text-white relative z-10 drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* How It Works Section - Scroll-Activated Steps */}
      <div ref={howItWorksRef} className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span 
            className="inline-block text-sm font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
          >
            How It Works
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
            Your Trip in{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 text-lg max-w-md mx-auto">
            From idea to itinerary in under a minute
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative flex flex-col gap-10">
          {[
            {
              step: '1',
              title: 'Tell Us Where & When',
              description: 'Pick your dream destination, how many days, your budget style, and who\'s coming along.',
              highlight: '30 seconds'
            },
            {
              step: '2',
              title: 'AI Builds Your Plan',
              description: 'We create a day-by-day itinerary with hotels, places to visit, and the best times to go.',
              highlight: '~15 seconds'
            },
            {
              step: '3',
              title: 'Explore & Share',
              description: 'Your complete trip is ready! View details, save to your account, and share with friends.',
              highlight: 'Yours forever'
            }
          ].map((item, index) => (
            <StepCard 
              key={index}
              step={item.step}
              title={item.title}
              description={item.description}
              highlight={item.highlight}
              index={index}
              activeStep={activeStep}
            />
          ))}
        </div>
      </div>

      {/* Social Proof & Testimonials Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Premium Social Proof Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Main heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
              Travelers Trust Us With Their Adventures
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              Real trips planned. Real experiences delivered. Zero stress.
            </p>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                number: '10,247',
                label: 'Trips Planned',
                sublabel: 'and counting...',
                icon: Compass,
                color: 'from-orange-500 to-amber-500'
              },
              {
                number: '4.9',
                label: 'Average Rating',
                sublabel: 'from real travelers',
                icon: Star,
                color: 'from-amber-500 to-yellow-500',
                showStars: true
              },
              {
                number: '500+',
                label: 'Destinations',
                sublabel: 'across 6 continents',
                icon: Globe,
                color: 'from-pink-500 to-rose-500'
              },
              {
                number: '<30s',
                label: 'To Generate',
                sublabel: 'your full itinerary',
                icon: Clock,
                color: 'from-violet-500 to-purple-500'
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="
                  relative overflow-hidden
                  bg-white
                  border border-zinc-200/80
                  rounded-2xl
                  p-5 md:p-6
                  shadow-lg shadow-zinc-200/50
                  hover:shadow-xl hover:shadow-orange-500/10
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:border-orange-500/30
                  transition-all duration-300 ease-out
                  will-change-transform
                  group
                  cursor-pointer
                "
              >
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Premium Icon Container */}
                  <div className={`
                    relative w-12 h-12 rounded-xl 
                    bg-gradient-to-br ${stat.color} 
                    flex items-center justify-center mb-4 
                    shadow-lg
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300 ease-out
                  `}>
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                    <stat.icon className="w-5 h-5 text-white relative z-10 drop-shadow-sm" />
                  </div>
                  
                  {/* Stars for rating */}
                  {stat.showStars && (
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  )}
                  
                  {/* Number */}
                  <div className="text-2xl md:text-3xl font-bold text-zinc-900">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm font-medium text-zinc-700 mt-1">
                    {stat.label}
                  </div>
                  
                  {/* Sublabel */}
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant results</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider spacing between stats and testimonials */}
        <div className="h-16" />

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Loved by Travelers
          </h3>
          <p className="text-zinc-500 mt-2">
            See what our community is saying
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Priya Sharma',
              role: 'Solo Explorer',
              initials: 'PS',
              text: 'This tool saved me hours of research. My Goa trip was perfectly planned in under 5 minutes!',
              gradient: 'from-orange-500 to-pink-500'
            },
            {
              name: 'Arjun Patel',
              role: 'Family Traveler',
              initials: 'AP',
              text: 'Finally, a planner that understands family travel. The activities were perfect for our kids.',
              gradient: 'from-pink-500 to-rose-500'
            },
            {
              name: 'Ananya Reddy',
              role: 'Adventure Seeker',
              initials: 'AR',
              text: 'The AI suggested spots I never would have found. Best Manali trip ever!',
              gradient: 'from-violet-500 to-purple-500'
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="
                relative overflow-hidden
                bg-white 
                border border-zinc-200/80 
                rounded-2xl p-6
                shadow-lg shadow-zinc-200/50
                hover:shadow-xl hover:shadow-orange-500/10
                hover:border-orange-500/30
                hover:-translate-y-2 hover:scale-[1.02]
                transition-all duration-300 ease-out
                will-change-transform
                cursor-pointer
                group
              "
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-6xl font-serif text-zinc-100 select-none group-hover:text-orange-500/10 transition-colors duration-300">"</div>
              
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-600 mb-6 leading-relaxed text-sm relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  {/* Premium Avatar */}
                  <div className={`
                    relative w-11 h-11 rounded-full 
                    bg-gradient-to-br ${testimonial.gradient} 
                    flex items-center justify-center 
                    text-white text-sm font-semibold 
                    shadow-lg
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300 ease-out
                  `}>
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                    <span className="relative z-10">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-16" />
    </div>
  )
}

export default Hero