import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, User, ChevronDown, Plus, Plane, Moon, Sun, History } from 'lucide-react'

function Header() {
  const { user, login, logout } = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  // Check localStorage on mount (don't use system preference)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      // Default to light mode
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  // Get user initials for fallback avatar
  const getUserInitials = (name) => {
    if (!name) return 'U'
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name[0].toUpperCase()
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-white/70 dark:bg-zinc-950/70
        border-b border-zinc-200 dark:border-white/10
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
      <Link to='/'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="
            w-10 h-10
            bg-linear-to-br from-orange-500 to-pink-500
            rounded-xl
            flex items-center justify-center
            shadow-lg
          ">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              AI Trip Plan
            </span>
          </div>
        </motion.div>
      </Link>
      <div className='flex items-center gap-3'>
        {user ? (
          <>
            <Link to='/my-trips'>
              <Button 
                variant="ghost" 
                className="
                  rounded-full 
                  cursor-pointer 
                  hover:scale-[1.02] 
                  active:scale-[0.98]
                  transition-all duration-200
                  hover:bg-zinc-100 dark:hover:bg-white/10
                "
              >
                <History className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">My Trips</span>
              </Button>
            </Link>
            
            <Link to='/create-trip'>
              <Button 
                variant="outline" 
                className="
                  rounded-full 
                  cursor-pointer 
                  hover:scale-[1.02] 
                  active:scale-[0.98]
                  transition-all duration-200
                  border-zinc-300 dark:border-white/20
                  backdrop-blur-sm
                "
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Create Trip</span>
              </Button>
            </Link>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="
                w-10 h-10 
                rounded-full 
                flex items-center justify-center
                bg-zinc-100 dark:bg-white/10
                hover:bg-zinc-200 dark:hover:bg-white/20
                transition-all duration-200
                cursor-pointer
              "
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-zinc-600" />
              )}
            </motion.button>
            
            <Popover>
              <PopoverTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center gap-2 transition-all focus:outline-none cursor-pointer'
                >
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name}
                      className='w-10 h-10 rounded-full border-2 border-zinc-300 dark:border-white/20 hover:border-orange-400 transition-colors cursor-pointer'
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className='w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold border-2 border-zinc-300 dark:border-white/20 hover:border-orange-400 transition-colors cursor-pointer'>
                      {getUserInitials(user.name)}
                    </div>
                  )}
                  <ChevronDown className='w-4 h-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer' />
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md" align="end">
                <div className='flex flex-col'>
                  {/* User Info Header */}
                  <div className='px-4 py-3 border-b border-zinc-200 dark:border-white/10'>
                    <p className='text-sm font-semibold text-zinc-900 dark:text-zinc-100'>{user.name}</p>
                    <p className='text-xs text-zinc-500 dark:text-zinc-400 truncate'>{user.email}</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className='p-2'>
                    <Link to='/my-trips'>
                      <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 text-left group cursor-pointer'>
                        <User className='w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100' />
                        <span className='text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'>My Trips</span>
                      </button>
                    </Link>
                    
                    <div className='my-1 border-t border-zinc-200 dark:border-white/10' />
                    
                    <button 
                      onClick={logout}
                      className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-all duration-200 text-left group cursor-pointer'
                    >
                      <LogOut className='w-4 h-4' />
                      <span className='text-sm font-medium'>Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            {/* Dark Mode Toggle for non-logged-in users */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="
                w-10 h-10 
                rounded-full 
                flex items-center justify-center
                bg-zinc-100 dark:bg-white/10
                hover:bg-zinc-200 dark:hover:bg-white/20
                transition-all duration-200
                cursor-pointer
              "
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-zinc-600" />
              )}
            </motion.button>

            <Button 
              onClick={() => login()} 
              className="
                rounded-full 
                cursor-pointer 
                hover:scale-[1.02] 
                active:scale-[0.98]
                transition-all duration-200
                bg-linear-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600
                border-0
              "
            >
              Sign In
            </Button>
          </>
        )}
      </div>
    </div>
    </motion.header>
  )
}

export default Header