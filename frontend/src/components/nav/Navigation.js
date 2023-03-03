import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='w-full p-3 bg-gray-700 flex justify-between items-center text-white'>
        <div className='text-xl'>Stripe Gateway</div>
        <div className='flex gap-x-4'>
            <Link to={'/'}>Home</Link>
            <Link to={'/signin'}>Sign In</Link>
            <Link to={'/signup'}>Sign Up</Link>
        </div>
    </nav>
  )
}

export default Navigation