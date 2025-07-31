'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import ModeToggle from './Dark-Mode-Toggle-Button'
import { useAuth, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ROUTES } from "@/constants/routePath"
import Link from 'next/link'
import clsx from 'clsx'

const navLinks = [
    { label: 'Find Hospitals', path: ROUTES.PAGE.FIND_HOSPITALS },
    { label: 'Medical Services', path: ROUTES.PAGE.SERVICES },
    { label: 'Health Packages', path: ROUTES.PAGE.FIND_PACKAGES },
    { label: 'About Us', path: ROUTES.PAGE.ABOUT },
    { label: 'Contacts', path: ROUTES.PAGE.CONTACT },
]

const Navbar = () => {
    const { isSignedIn } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav className={clsx(
                'z-50 max-w-7xl mx-auto transition-all duration-300 px-8 rounded-full flex items-center justify-between',
                'border dark:border-gray-700 shadow-lg backdrop-blur-md',
                'bg-white/90 dark:bg-gray-900/80',
                isScrolled
                    ? 'fixed py-2 translate-1/4' // Scrolled look
                    : 'relative mt-4 py-5 shadow-md'
            )}>

                <div className='block md:hidden'>
                    <Button variant='ghost' onClick={() => setSidebarOpen(true)}>
                        ☰
                    </Button>
                </div>

                <Link
                    href="/"
                    className={clsx(
                        "font-bold transition-all duration-300 tracking-tight",
                        isScrolled
                            ? "text-xl mr-4 text-blue-900 dark:text-blue-300"
                            : "text-2xl text-blue-900 dark:text-blue-300"
                    )}
                >
                    HEALP
                </Link>

                <div className="hidden md:flex items-center gap-x-8">
                    {navLinks.map(({ label, path }) => (
                        <Link href={path} key={path}>
                            <span className={clsx(
                                'transition-all font-medium duration-300 px-4 py-1 rounded-full',
                                isScrolled ? 'text-sm' : 'text-base',
                                'text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200'
                            )}>
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className='flex items-center gap-3'>
                    <Button className='text-blue-800 dark:text-white font-semibold' variant='ghost'>
                        {isSignedIn ? <UserButton /> : <div onClick={() => router.push("/auth/signin")}>Login</div>}
                    </Button>
                    <ModeToggle />
                </div>
            </nav>

            {/* Backdrop Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={clsx(
                'fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white dark:bg-gray-900 z-50 shadow-xl transition-transform duration-300 ease-in-out flex flex-col',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">HEALP</h2>
                    <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6 text-blue-800 dark:text-white" />
                    </Button>
                </div>

                {/* Optional: User Info */}
                {isSignedIn && (
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Welcome!</div>
                    </div>
                )}

                {/* Nav Links */}
                <ul className="flex flex-col px-5 py-4 gap-4 overflow-y-auto">
                    {navLinks.map(({ label, path }) => (
                        <Link
                            href={path}
                            key={path}
                            onClick={() => setSidebarOpen(false)}
                            className="block text-base font-medium text-gray-700 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-800 px-4 py-2 rounded-md transition"
                        >
                            {label}
                        </Link>
                    ))}
                </ul>

                {/* Bottom Actions */}
                <div className="mt-auto px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <Button
                        onClick={() => {
                            setSidebarOpen(false)
                            if (!isSignedIn) router.push('/auth/signin')
                        }}
                        variant="outline"
                        className="w-full text-blue-700 dark:text-white border-blue-500 dark:border-gray-500"
                    >
                        {isSignedIn ? 'Dashboard' : 'Login'}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Navbar