'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Doctor, Hospital } from '@prisma/client'

type SearchResults = {
    doctors: Doctor[]
    hospitals: Hospital[]
    packages: {
        id: number
        name: string
        price: number
        description?: string
    }[]
}

const GlobalSearchPage = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('query')?.toLowerCase() || ''

    const [results, setResults] = useState<SearchResults>({
        doctors: [],
        hospitals: [],
        packages: [],
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
                const data = await res.json()
                setResults(data)
            } catch (err) {
                console.error('Search failed:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    if (loading) return <p className="text-center mt-10">Searching...</p>

    const isEmpty =
        results.doctors.length === 0 &&
        results.hospitals.length === 0 &&
        results.packages.length === 0

    return (
        <div className='px-6 py-10'>
            <h1 className='text-2xl font-bold mb-6'>
                Search results for: <span className="text-blue-600">&quot;{query}&quot;</span>
            </h1>

            {isEmpty ? (
                <p>No results found.</p>
            ) : (
                <>
                    {results.doctors.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Doctors</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {results.doctors.map((doc) => (
                                    <div key={doc.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
                                        <h3 className="font-bold">{doc.name}</h3>
                                        <p>{doc.speciality} - {doc.degree}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {results.hospitals.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Hospitals</h2>
                            <ul>
                                {results.hospitals.map((h) => (
                                    <li key={h.id}>{h.name} — {h.state}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* You can enable packages later if needed */}
                    {/* {results.packages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Health Packages</h2>
              <ul>
                {results.packages.map((p) => (
                  <li key={p.id}>{p.name} — ₹{p.price}</li>
                ))}
              </ul>
            </section>
          )} */}
                </>
            )}
        </div>
    )
}

export default GlobalSearchPage
