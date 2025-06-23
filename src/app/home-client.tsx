"use client";

import { useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { GetStarted } from '@/components/sections/get-started';
import { BookingModal } from '@/components/booking-modal';
import { CreatorShowcase } from '@/components/sections/creator-showcase';
import { Testimonials } from '@/components/sections/testimonials';

export function HomePageClient() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <>
            <Hero onBookNowClick={() => setIsBookingModalOpen(true)} />
            <Features className="bg-card/50" />
            <CreatorShowcase />
            <Testimonials className="bg-card/50" />
            <GetStarted />
            <BookingModal isOpen={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />
        </>
    );
}
