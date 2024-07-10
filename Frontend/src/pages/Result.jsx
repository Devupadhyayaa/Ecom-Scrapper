import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Star from '../components/Star';
const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!location.state || !location.state.data) {
          navigate('/');
          return;
        }
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:4000/api', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url:location.state.data.URL, website:location.state.data.category }),
            });
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error:', error);
          }
          setLoading(false);
        };
        fetchData();
        const { URL, category } = location.state.data;
    }, [location.state, navigate]);
    return (
        <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 w-full'>
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-white"></div>
          {loading ? (
                  <div className="w-full">
                  <div className="header w-full bg-purple-800 h-[63px] mx-auto flex justify-center items-center">
                    
                  </div>
                  <div className="mt-[30px] lg:flex lg:gap-[10px] w-[95vw] mx-auto lg:p-[20px] p-[10px] h-[85vh] bg-[#ffffff] rounded-2xl">
                    <div className="w-full lg:w-[40%] h-[58%] lg:h-full mb-[10px] flex justify-center items-center">
                      <Skeleton width={'70%'} height={'70%'} />
                    </div>
                    <div className="w-full lg:w-[60%] h-[40%] lg:h-full pt-[20px] overflow-scroll">
                      <Skeleton width={'100%'} height={33} />
                      <Skeleton width={'80%'} height={33} />
                      <Skeleton width={'90%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                      <br/>
                      <br/>
                      <br/>
                      <Skeleton width={'95%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                      <Skeleton width={'95%'} height={33} />
                    </div>
                  </div>
                </div>
          ) : (
            <div className="w-full">
                <div className="header w-full bg-purple-800 h-[63px] mx-auto flex justify-center items-center">
                  <h1 className='text-white text-[25px] text-center' >Your Product</h1>
                </div>
                <div className="mt-[30px] lg:flex lg:gap-[10px] w-[95vw] mx-auto lg:p-[20px] p-[10px] h-[85vh] bg-[#ffffff] rounded-2xl">
                  <div className="w-full lg:w-[40%] h-[58%] lg:h-full mb-[10px] flex justify-center items-center">
                    <img src={data.imageUrls} alt="" className='lg:w-[70%] lg:h-[70%] w-[100%] h-[100%] lg:object-fill object-contain'/>
                  </div>
                  <div className="w-full lg:w-[60%] h-[40%] lg:h-full pt-[20px] overflow-scroll">
                    <h1 className='lg:text-[33px] text-[16px] text-black font-bold mb-[10px]'>{data.product_name}</h1>
                    <div className="w-full lg:flex gap-[20px] h-[33px] items-center">
                     <h3 className='lg:text-[33px] text=[16px] text-[#da5610] font-bold '>{data.price}</h3>
                     <Star stars={Number(data.averageRating)} reviews={data.totalRatings}/>
                    </div>
                    <div className="w-full mt-[30px] min-h-[70%] bg-[#80808060] p-3 rounded-2xl">
                      <p className='text-black lg:text-[28px] text-[15px]'>
                        {data.productPoints}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          )}
        </div>
      );
}

export default Result
