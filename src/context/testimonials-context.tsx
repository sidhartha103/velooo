
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    text: string;
    avatar: string;
    hint: string;
    status: 'pending' | 'approved' | 'rejected';
}

const initialTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah L.",
        role: "Fashion Influencer",
        avatar: "https://placehold.co/100x100.png",
        hint: "woman portrait",
        text: "VeloShoot is a game-changer. The 10-minute turnaround for high-quality reels is unheard of. It's completely streamlined my content creation process!",
        status: 'approved'
    },
    {
        id: 2,
        name: "David C.",
        role: "Event Planner",
        avatar: "https://placehold.co/100x100.png",
        hint: "man portrait",
        text: "I booked a creator for a corporate event, and the results were phenomenal. The professionalism and quality exceeded all expectations. Highly recommended.",
        status: 'approved'
    },
    {
        id: 3,
        name: "Maya G.",
        role: "Travel Vlogger",
        avatar: "https://placehold.co/100x100.png",
        hint: "woman smiling",
        text: "The platform is so easy to use, and the creator network is top-notch. I can always find the perfect match for my style, no matter where I am.",
        status: 'approved'
    },
    {
        id: 4,
        name: "Alex Johnson",
        role: "Startup Founder",
        avatar: "https://placehold.co/100x100.png",
        hint: "person thinking",
        text: "This is a test submission that is pending approval. VeloShoot helped us get amazing content for our launch week!",
        status: 'pending'
    }
];

interface TestimonialsContextType {
    testimonials: Testimonial[];
    addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'status'>) => void;
    approveTestimonial: (id: number) => void;
    rejectTestimonial: (id: number) => void;
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(undefined);

export function TestimonialsProvider({ children }: { children: ReactNode }) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedTestimonials = localStorage.getItem('testimonials');
            if (storedTestimonials) {
                setTestimonials(JSON.parse(storedTestimonials));
            } else {
                setTestimonials(initialTestimonials);
            }
        } catch (error) {
            console.error("Failed to load testimonials from localStorage", error);
            setTestimonials(initialTestimonials);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                const testimonialsToSave = testimonials.filter(t => !t.avatar.startsWith('blob:'));
                localStorage.setItem('testimonials', JSON.stringify(testimonialsToSave));
            } catch (error) {
                console.error("Failed to write testimonials to localStorage", error);
            }
        }
    }, [testimonials, isInitialized]);

    const addTestimonial = useCallback((testimonial: Omit<Testimonial, 'id' | 'status'>) => {
        const newTestimonial: Testimonial = { ...testimonial, id: Date.now(), status: 'pending' };
        setTestimonials(prev => [newTestimonial, ...prev]);
    }, []);

    const updateTestimonialStatus = useCallback((id: number, status: 'approved' | 'rejected') => {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    }, []);

    const approveTestimonial = useCallback((id: number) => {
        updateTestimonialStatus(id, 'approved');
    }, [updateTestimonialStatus]);

    const rejectTestimonial = useCallback((id: number) => {
        updateTestimonialStatus(id, 'rejected');
    }, [updateTestimonialStatus]);

    const value = useMemo(() => ({ testimonials, addTestimonial, approveTestimonial, rejectTestimonial }), [testimonials, addTestimonial, approveTestimonial, rejectTestimonial]);

    return (
        <TestimonialsContext.Provider value={value}>
            {children}
        </TestimonialsContext.Provider>
    );
}

export function useTestimonials() {
    const context = useContext(TestimonialsContext);
    if (context === undefined) {
        throw new Error('useTestimonials must be used within a TestimonialsProvider');
    }
    return context;
}
