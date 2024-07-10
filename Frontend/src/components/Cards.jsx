import React, { useState } from 'react';
import pic from '../assets/ecom.png';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [data, setData] = useState({ URL: "", category: "" });
  const navigate = useNavigate();


  const onSubmit = (d) => {
    setData(d);
    navigate('/result', { state: { data: d } });
    console.log(data);
  };

  return (
    <div className='lg:mt-[120px] mt-6 w-full lg:h-[65vh] h-[80vh] bg-[#032f44] lg:p-5 p-2 lg:flex gap-4 rounded-lg'>
      <div className="details lg:w-[50%] w-full lg:h-[100%] h-[48%] lg:mb-6 mb-2 rounded-lg flex justify-center items-center">
        <div className="box w-[100%] h-[100%] bg-[#1d1d1d6b] flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className='flex lg:items-center justify-center flex-col gap-3 w-full p-3'>
            <h4 className='lg:w-1/2  lg:text-[20px] text-[14px]'>*URL of your required product*</h4>
            <input {...register("URL", { required: { value: true, message: "This field is required" } })} placeholder="Enter the URL" className='lg:w-1/2 h-[33px] p-[10px] text-[18px] text-[black] rounded-md' />
            <div className="lg:w-1/2 h-[20px] lg:text-[14px] text-[10px] text-red-700 ">{errors.URL && errors.URL.message}</div>
            <h4 className='lg:w-1/2  lg:text-[20px] text-[14px]'>*Select your website*</h4>
            <select {...register("category", { required: { value: true, message: "This field is required" } })} className='lg:w-1/2 h-[33px] p-[10px] text-[18px] text-[black] rounded-md'>
              <option value="">Select...</option>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Myntra">Myntra</option>
              <option value="Snapdeal">Snapdeal</option>
            </select>
            <div className="lg:w-1/2 h-[20px] lg:text-[14px] text-[10px] text-red-700 ">{errors.category && errors.category.message}</div>
            <input type="submit" className='lg:w-1/2 h-[54px] bg-[yellow] text-black text-[23px] rounded-md cursor-pointer' />
          </form>
        </div>
      </div>
      <div className="imgs lg:w-[50%] w-full lg:h-[100%] h-[48%] flex justify-center items-center">
        <img src={pic} alt="" className='w-[100%] h-[100%] object-fill ' />
      </div>
    </div>
  );
}

export default Cards;
