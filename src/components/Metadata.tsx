import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Healp - Simplifying Healthcare Access',
    description: 'Healp is a smart healthcare SaaS platform that connects patients and families with trusted doctors and hospitals quickly and easily.',
    openGraph: {
        title: 'Healp - Simplifying Healthcare Access',
        description: 'Healp is a modern SaaS healthcare platform designed to simplify access to medical care. Patients and their families can easily find verified doctors and partner hospitals, book appointments, and get essential support—all from a single, user-friendly interface.',
        url: 'https://healp.vercel.app',
        siteName: 'Healp',
        images: [
            {
                url: 'https://healp.vercel.app/og-image.png', // replace with your actual image
                width: 1200,
                height: 630,
                alt: 'Healp SaaS Healthcare Platform',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healp - Simplifying Healthcare Access',
        description: 'Healp is a modern SaaS platform connecting patients and families with verified doctors and hospitals for stress-free healthcare support.',
        images: ['https://healp.vercel.app/og-image.png'],
    },
};
