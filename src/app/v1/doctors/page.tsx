// app/find-doctor/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import DoctorCard from '@/components/DoctorCard'
import { ROUTES } from "@/constants/routePath"

type Doctor = {
    id: number
    name: string
    degree: string
    speciality: string
    rating: number
    age: number
    email: string
}

const FindDoctorPage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(ROUTES.API.FIND_DOCTOR)
                const data = await res.json()
                setDoctors(data)
            } catch (err) {
                console.error('Failed to fetch doctors:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchDoctors()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Find a Doctor
            </h1>

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading doctors...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FindDoctorPage
