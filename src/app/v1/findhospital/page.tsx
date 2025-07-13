"use client";

import React, { useEffect, useState } from "react";
import { Hospital } from "@prisma/client";

const FindHospital = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    // fetch once on mount
    useEffect(() => {
        async function fetchHospitals() {
            const res = await fetch("/api/hospitals");
            const data: Hospital[] = await res.json();
            setHospitals(data);
        }
        fetchHospitals();
    }, []);

    return (
        <ul className="space-y-2">
            {hospitals.map((h) => (
                <li key={h.id} className="border p-4 rounded">
                    <p className="font-semibold">{h.name}</p>
                    <p>{h.city}, {h.state}</p>
                    <p className="text-sm text-gray-500">Speciality: {h.speciality}</p>
                    <p className="text-sm">Ratings: {h.ratings}</p>
                </li>
            ))}
        </ul>
    );
};

export default FindHospital;
