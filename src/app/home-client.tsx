"use client";

import { useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { GetStarted } from '@/components/sections/get-started';
import { BookingModal } from '@/components/booking-modal';

export function HomePageClient() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <>
            <Hero onBookNowClick={() => setIsBookingModalOpen(true)} />
            <Features />
            <GetStarted />
            <BookingModal isOpen={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />
        </>
    );
}
