'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routePath'
import { motion, useAnimation } from 'framer-motion'

type Doctor = {
    id: number
    name: string
    degree: string
    speciality: string
    rating: number
    age: number
    email: string
}

const DoctorsSection = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(ROUTES.API.FIND_DOCTOR)
                const data = await res.json()
                setDoctors(data.slice(0, 6))
            } catch (err) {
                console.error('Failed to fetch doctors:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchDoctors()
    }, [])

    return (
        <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold">Meet Our Top Doctors</h2>
                <Link
                    href={ROUTES.PAGE.FIND_DOCTOR}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    More &rarr;
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-500 dark:text-gray-400">Loading doctors...</p>
            ) : (
                <AutoScrollCarousel doctors={doctors} />
            )}
        </section>
    )
}

export default DoctorsSection

// 💡 Auto-Scroll Carousel Component
const AutoScrollCarousel = ({ doctors }: { doctors: Doctor[] }) => {
    const controls = useAnimation()

    useEffect(() => {
        const loopScroll = async () => {
            while (true) {
                await controls.start({
                    x: ['0%', '-100%'],
                    transition: {
                        duration: 30,
                        ease: 'linear',
                        repeat: Infinity,
                    },
                })
            }
        }
        loopScroll()
    }, [controls])

    const duplicated = [...doctors, ...doctors] // loop illusion

    return (
        <div className="relative w-full overflow-hidden">
            <motion.div
                animate={controls}
                className="flex gap-6 w-max"
                style={{ willChange: 'transform' }}
            >
                {duplicated.map((doc, index) => (
                    <div
                        key={`${doc.id}-${index}`}
                        className="min-w-[250px] bg-blue-50 dark:bg-gray-800 rounded-xl p-4 shadow-md flex-shrink-0"
                    >
                        <h3 className="text-xl font-bold mb-1">{doc.name}</h3>
                        <p className="text-sm">{doc.degree}</p>
                        <p className="text-sm">{doc.speciality}</p>
                        <p className="text-sm mt-2 text-yellow-600">⭐ {doc.rating.toFixed(1)}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
