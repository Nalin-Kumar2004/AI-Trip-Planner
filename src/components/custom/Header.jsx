import React from 'react'
import { Button } from '../ui/button'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, User, ChevronDown, Plus, Plane, History } from 'lucide-react'

function Header() {
  const { user, login, logout } = useAuth()

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
        bg-white/70
        border-b border-zinc-200
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
            <span className="text-xl font-bold text-zinc-900">
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
                  hover:bg-zinc-100
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
                  border-zinc-300
                  backdrop-blur-sm
                "
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Create Trip</span>
              </Button>
            </Link>


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
                      className='w-10 h-10 rounded-full border-2 border-zinc-300 hover:border-orange-400 transition-colors cursor-pointer'
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className='w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold border-2 border-zinc-300 hover:border-orange-400 transition-colors cursor-pointer'>
                      {getUserInitials(user.name)}
                    </div>
                  )}
                  <ChevronDown className='w-4 h-4 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer' />
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 border-zinc-200 bg-white/95 backdrop-blur-md" align="end">
                <div className='flex flex-col'>
                  {/* User Info Header */}
                  <div className='px-4 py-3 border-b border-zinc-200'>
                    <p className='text-sm font-semibold text-zinc-900'>{user.name}</p>
                    <p className='text-xs text-zinc-500 truncate'>{user.email}</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className='p-2'>
                    <Link to='/my-trips'>
                      <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-100 transition-all duration-200 text-left group cursor-pointer'>
                        <User className='w-4 h-4 text-zinc-600 group-hover:text-zinc-900' />
                        <span className='text-sm text-zinc-700 group-hover:text-zinc-900'>My Trips</span>
                      </button>
                    </Link>
                    
                    <div className='my-1 border-t border-zinc-200' />
                    
                    <button 
                      onClick={logout}
                      className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200 text-left group cursor-pointer'
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