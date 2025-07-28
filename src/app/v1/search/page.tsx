'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const GlobalSearchPage = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('query')?.toLowerCase() || ''
    const [results, setResults] = useState<any>({})
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

    return (
        <div className='px-6 py-10'>
            <h1 className='text-2xl font-bold mb-6'>Search results for: <span className="text-blue-600">"{query}"</span></h1>

            {Object.keys(results).length === 0 ? (
                <p>No results found.</p>
            ) : (
                <>
                    {results.doctors?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Doctors</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {results.doctors.map((doc: any) => (
                                    <div key={doc.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
                                        <h3 className="font-bold">{doc.name}</h3>
                                        <p>{doc.speciality} - {doc.degree}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {results.hospitals?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Hospitals</h2>
                            <ul>
                                {results.hospitals.map((h: any) => (
                                    <li key={h.id}>{h.name} — {h.location}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {results.packages?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Health Packages</h2>
                            <ul>
                                {results.packages.map((p: any) => (
                                    <li key={p.id}>{p.name} — ₹{p.price}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </>
            )}
        </div>
    )
}

export default GlobalSearchPage
