'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';

const initialReels = [
    { id: 1, src: "https://placehold.co/400x600.png", category: "Events & Weddings", hint: "wedding event", isVideo: false },
    { id: 2, src: "https://placehold.co/400x600.png", category: "Celebrities", title: "Celebrity Highlights", hint: "celebrity portrait", isVideo: false },
    { id: 3, src: "https://placehold.co/400x600.png", category: "Car Delivery", isVideo: true, hint: "luxury car" },
    { id: 4, src: "https://placehold.co/400x600.png", category: "Outfit Shoots", hint: "fashion model", isVideo: false },
    { id: 5, src: "https://placehold.co/400x600.png", category: "Concerts", hint: "music concert", isVideo: false },
    { id: 6, src: "https://placehold.co/400x600.png", category: "Events & Weddings", hint: "party event", isVideo: false },
    { id: 7, src: "https://placehold.co/400x600.png", category: "Outfit Shoots", isVideo: true, hint: "street style" },
    { id: 8, src: "https://placehold.co/400x600.png", category: "Celebrities", hint: "red carpet", isVideo: false },
];

export interface Reel {
    id: number;
    src: string;
    category: string;
    title?: string;
    isVideo: boolean;
    hint: string;
}

interface ShowcaseContextType {
    reels: Reel[];
    addReel: (reel: Omit<Reel, 'id'>) => void;
    deleteReel: (id: number) => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

export function ShowcaseProvider({ children }: { children: ReactNode }) {
    const [reels, setReels] = useState<Reel[]>(initialReels);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedReels = localStorage.getItem('showcaseReels');
            if (storedReels) {
                setReels(JSON.parse(storedReels));
            }
        } catch (error) {
            console.error("Failed to load reels from localStorage", error);
            setReels(initialReels);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                // Filter out temporary blob URLs before saving to localStorage
                const persistentReels = reels.filter(reel => !reel.src.startsWith('blob:'));
                localStorage.setItem('showcaseReels', JSON.stringify(persistentReels));
            } catch (error) {
                console.error("Failed to save reels to localStorage. Changes to new uploads won't be persisted.", error);
            }
        }
    }, [reels, isInitialized]);


    const addReel = useCallback((reel: Omit<Reel, 'id'>) => {
        const newReel = { ...reel, id: Date.now() };
        setReels(prevReels => [newReel, ...prevReels]);
    }, []);

    const deleteReel = useCallback((id: number) => {
        setReels(prevReels => prevReels.filter(reel => reel.id !== id));
    }, []);

    const value = useMemo(() => ({ reels, addReel, deleteReel }), [reels, addReel, deleteReel]);

    return (
        <ShowcaseContext.Provider value={value}>
            {children}
        </ShowcaseContext.Provider>
    );
}

export function useShowcase() {
    const context = useContext(ShowcaseContext);
    if (context === undefined) {
        throw new Error('useShowcase must be used within a ShowcaseProvider');
    }
    return context;
}
