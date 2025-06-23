'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Booking {
    id: number;
    name: string;
    phone: string;
    email: string;
    occasion: string;
    date: string;
    status: 'new' | 'contacted';
}

interface BookingContextType {
    bookings: Booking[];
    addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
    updateBookingStatus: (id: number, status: 'contacted') => void;
    deleteBooking: (id: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedBookings = localStorage.getItem('bookings');
            if (storedBookings) {
                setBookings(JSON.parse(storedBookings));
            }
        } catch (error) {
            console.error("Failed to load bookings from localStorage", error);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem('bookings', JSON.stringify(bookings));
            } catch (error) {
                console.error("Failed to write bookings to localStorage", error);
            }
        }
    }, [bookings, isInitialized]);

    const addBooking = useCallback((booking: Omit<Booking, 'id' | 'status'>) => {
        const newBooking: Booking = { ...booking, id: Date.now(), status: 'new' };
        setBookings(prev => [newBooking, ...prev]);
        toast({
            title: 'Enquiry Submitted!',
            description: 'We have received your request and will get back to you shortly.',
        });
    }, [toast]);

    const updateBookingStatus = useCallback((id: number, status: 'contacted') => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        toast({
            title: 'Booking Updated',
            description: 'The booking has been marked as contacted.',
        });
    }, [toast]);

    const deleteBooking = useCallback((id: number) => {
        setBookings(prev => prev.filter(b => b.id !== id));
        toast({
            variant: 'destructive',
            title: 'Booking Deleted',
            description: 'The booking has been permanently removed.',
        });
    }, [toast]);

    const value = useMemo(() => ({ bookings, addBooking, updateBookingStatus, deleteBooking }), [bookings, addBooking, updateBookingStatus, deleteBooking]);

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookings must be used within a BookingProvider');
    }
    return context;
}
