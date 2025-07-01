'use client'

import Image from 'next/image'
import React from 'react'
import hero_page_image from '@/assets/hero_page_image.jpg'
import { FaSearch } from "react-icons/fa";


const Home = () => {

    return (
        <div>
            <div className="relative h-full">
                <Image
                    src={hero_page_image}
                    alt='Hero Page Image'
                    className='w-screen h-[60vh] object-cover blur-xs'
                    priority
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                    <div className='flex justify-center items-center w-full'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-white m-2 px-4 py-2 rounded-md text-black w-full max-w-md shadow-md"
                        />
                        <div className='border border-white rounded-md hover:scale-105 hover:cursor-pointer hover:bg-white hover:text-black transition-all duration-150'>
                            <FaSearch className='transition-all duration-150 size-8 rounded-full p-2 hover:scale-105' />
                        </div>

                    </div>


                    <div className="mt-4 flex gap-4">
                        <button className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200">
                            Book Appointment
                        </button>
                        <button className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200">
                            Find Packages
                        </button>
                        <button className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200">
                            Find Doctor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
