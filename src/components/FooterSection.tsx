import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-[#0D5EA6]/95 backdrop-blur-md shadow-inner text-white px-6 md:px-16 py-12 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-2">HEALP</h3>
                    <p className="text-sm max-w-sm">Your trusted platform for finding doctors, booking appointments, and accessing healthcare packages.</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Use</Link></li>
                    </ul>
                </div>
            </div>
            <p className="text-center text-xs mt-8 text-blue-100">&copy; {new Date().getFullYear()} HEALP. All rights reserved.</p>
        </footer>
    )
}

export default Footer
