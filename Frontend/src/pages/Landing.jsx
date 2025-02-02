import React from 'react'
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
const Landing = () => {
  return (
    <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900'>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <div className="container  mx-auto px-8">
            <Navbar/>
            <Cards/>
        </div>
    </div>
  )
}

export default Landing
