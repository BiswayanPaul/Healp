'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { ROUTES } from '@/constants/routePath'

type Hospital = {
    id: number
    name: string
    city: string
    state: string
    speciality: string
    ratings: number
}

const HospitalsSection = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([])
    const controls = useAnimation()

    // Fetch from backend
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const res = await fetch(ROUTES.API.FIND_HOSPITALS)
                const data: Hospital[] = await res.json()
                setHospitals(data.slice(0, 8)) // top 8 hospitals shown
            } catch (error) {
                console.error('Error fetching hospitals:', error)
            }
        }

        fetchHospitals()
    }, [])

    // Animation loop
    useEffect(() => {
        const startLoop = async () => {
            while (true) {
                await controls.start({
                    x: ['0%', '-100%'],
                    transition: {
                        duration: 40, // ⏳ change to 25 for faster scroll
                        ease: 'linear',
                        repeat: Infinity,
                    },
                })
            }
        }

        if (hospitals.length > 0) {
            startLoop()
        }
    }, [controls, hospitals])

    const duplicated = [...hospitals, ...hospitals] // for looping

    return (
        <section className="py-16 px-6 md:px-16 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold">Partnered Hospitals</h2>
                <Link href={ROUTES.PAGE.FIND_HOSPITALS} className="text-blue-600 hover:underline dark:text-blue-400">
                    More &rarr;
                </Link>
            </div>

            {hospitals.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Loading hospitals...</p>
            ) : (
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        animate={controls}
                        className="flex gap-6 w-max"
                        style={{ willChange: 'transform' }}
                    >
                        {duplicated.map((h, idx) => (
                            <div
                                key={`${h.id}-${idx}`}
                                className="min-w-[250px] bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md flex-shrink-0"
                            >
                                <h3 className="text-xl font-bold mb-1">{h.name}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {h.city}, {h.state}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Speciality: {h.speciality}
                                </p>
                                <p className="text-sm text-yellow-600 mt-1">
                                    ⭐ {h.ratings.toFixed(1)}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </section>
    )
}

export default HospitalsSection
