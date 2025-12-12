import React from 'react'
import {Button} from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[60px] text-center'
      >
        <span className='text-[#f56551]'>Discover Your Next Adventure with  AI:</span> <br></br>Personalized Iteneraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator.</p>
        
        <Link to={'/create-trip'} >
          <Button>Get Started. Its Free</Button>
        </Link>

        
    </div>
  )
}

export default Hero