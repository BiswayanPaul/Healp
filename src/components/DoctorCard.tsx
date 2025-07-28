// components/DoctorCard.tsx
'use client'

import React from 'react'

type DoctorProps = {
    name: string
    degree: string
    speciality: string
    rating: number
    age: number
    email: string
}

const DoctorCard = ({
    name,
    degree,
    speciality,
    rating,
    age,
    email,
}: DoctorProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-sm hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h2>
            <p className="text-gray-700 dark:text-gray-300">{degree}</p>
            <p className="text-gray-700 dark:text-gray-300">Speciality: {speciality}</p>
            <p className="text-gray-700 dark:text-gray-300">Age: {age}</p>
            <p className="text-gray-700 dark:text-gray-300">Email: {email}</p>
            <p className="text-yellow-500 mt-2 font-medium">⭐ {rating.toFixed(1)} / 5</p>
        </div>
    )
}

export default DoctorCard
