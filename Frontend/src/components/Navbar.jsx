import React from 'react'
import logo from "../assets/file.png"
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='w-full h-[73px] bg-[#032f44d5] flex justify-around mt-[60px] rounded-md '>
      <ul className='lg:w-[50%] flex justify-around lg:justify-start lg:gap-[55px] gap-[25px] lg:px-8 items-center '>
        <li className='flex justify-center items-center lg:text-[19px] font-bold text-[#ffffff]'><NavLink className={(e)=>{return e.isActive?"recognise":""}} to="/">URLSearch</NavLink></li>
        <li className='flex justify-center items-center lg:text-[19px] font-bold  text-[#ffffff]' ><NavLink className={(e)=>{return e.isActive?"recognise":""}} to="/Compare">Compare</NavLink></li>
      </ul>
      <div className="logo lg:w-[50%] h-[100%] flex justify-end items-center lg:px-8">
        <img src={logo} alt="" className='lg:h-[90%] lg:w-[60px] w-[44px] h-[44px] '/>
      </div>
    </div>
  )
}

export default Navbar
