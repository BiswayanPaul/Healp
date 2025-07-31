import Navbar from "@/components/Navbar"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <head>
            {/* Force index and follow manually */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
        </head>
        <Navbar />
        {children}
    </section>
}