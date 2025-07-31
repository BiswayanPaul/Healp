'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routePath'
import { motion } from 'framer-motion'
import DoctorsSection from '@/components/DoctorSection'
import HospitalsSection from '@/components/HospitalSection'
import Footer from '@/components/FooterSection'



const Home = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (!searchTerm.trim()) return
        router.push(`/v1/search?query=${encodeURIComponent(searchTerm.trim())}`)
    }

    return (
        <>
            {/* 💡 HERO SECTION */}
            <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between overflow-hidden bg-[#f0f4f8] dark:bg-gray-900 transition-colors duration-300">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2 px-6 md:px-16 py-10 flex flex-col justify-center gap-6 z-10"
                >

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        Your Health, Our Priority
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md">
                        Search for top doctors, hospitals, and services with ease.
                    </p>

                    {/* Search Bar */}
                    <div className="flex w-full max-w-md overflow-hidden border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm">
                        <input
                            type="text"
                            placeholder="Search doctors, hospitals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1 px-4 py-2 text-black dark:text-white bg-transparent focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition"
                        >
                            <FaSearch />
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button className="transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl">
                            Book Appointment
                        </button>

                        <button
                            onClick={() => router.push(ROUTES.PAGE.FIND_DOCTOR)}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-6 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                        >
                            Find Doctor
                        </button>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="relative w-full md:w-1/2 h-[40vh] md:h-[90vh] rounded-l-[3rem] overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                >
                    <Image
                        src="/assets/hero_page_image.jpg"
                        alt="Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

            </section>
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                viewport={{ once: true }}
            >
                {/* section content */}
                {/* 💡 Scrollable Sections Below */}
                <DoctorsSection />
                <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent my-12"></div>

                <HospitalsSection />
                <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent my-12"></div>

                <Footer />
            </motion.section>


        </>
    )
}

export default Home
