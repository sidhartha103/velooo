// src/context/showcase-context.tsx (Refactored)
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';

// The initial data serves as a fallback if nothing is in localStorage.
const initialReels = [
    { id: 1, src: "/images/showcase/wedding.jpg", category: "Events & Weddings", hint: "wedding event", isVideo: false },
    { id: 2, src: "/images/showcase/celebrity.jpg", category: "Celebrities", title: "Celebrity Highlights", hint: "celebrity portrait", isVideo: false },
    { id: 3, src: "/videos/showcase/car.mp4", category: "Car Delivery", isVideo: true, hint: "luxury car" },
    { id: 4, src: "/images/showcase/fashion.jpg", category: "Outfit Shoots", hint: "fashion model", isVideo: false },
    { id: 5, src: "/images/showcase/concert.jpg", category: "Concerts", hint: "music concert", isVideo: false },
    { id: 6, src: "/images/showcase/party.jpg", category: "Events & Weddings", hint: "party event", isVideo: false },
    { id: 7, src: "/videos/showcase/street-style.mp4", category: "Outfit Shoots", isVideo: true, hint: "street style" },
    { id: 8, src: "/images/showcase/red-carpet.jpg", category: "Celebrities", hint: "red carpet", isVideo: false },
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
    addReel: (reel: Omit<Reel, 'id' | 'src'>, file: File) => Promise<void>;
    deleteReel: (id: number) => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

// Helper function to read from localStorage safely
function getInitialState(): Reel[] {
    try {
        const storedReels = localStorage.getItem('showcaseReels');
        if (storedReels) {
            return JSON.parse(storedReels);
        }
    } catch (error) {
        console.error("Failed to parse reels from localStorage", error);
    }
    // If localStorage is empty or fails, return the default set.
    return initialReels;
}


export function ShowcaseProvider({ children }: { children: ReactNode }) {
    // Initialize state directly from the helper function.
    // The `useState` initializer function only runs once on component mount.
    const [reels, setReels] = useState<Reel[]>(getInitialState);

    // This effect is now solely responsible for persisting the state to localStorage whenever it changes.
    useEffect(() => {
        try {
            localStorage.setItem('showcaseReels', JSON.stringify(reels));
        } catch (error) {
            console.error("Failed to write reels to localStorage", error);
        }
    }, [reels]);

    /**
     * Handles adding a new reel.
     * In a real backend, this is where you would upload the file to a cloud storage
     * service (like AWS S3) and get back a permanent URL.
     * For this client-side version, we simulate this by saving to a persistent state.
     */
    const addReel = useCallback(async (reelData: Omit<Reel, 'id' | 'src'>, file: File) => {
        // In a true backend implementation, the following would happen:
        // 1. const uploadResponse = await fetch('/api/upload', { method: 'POST', body: file });
        // 2. const { url } = await uploadResponse.json();
        // 3. const newReel = { ...reelData, id: Date.now(), src: url };

        // For client-side persistence with temporary URLs, we use object URLs.
        // NOTE: These URLs are temporary and will not persist across browser restarts.
        // The management page will show them, but they will be gone on a hard refresh.
        // This is the correct behavior without a real backend.
        const newReel = {
            ...reelData,
            id: Date.now(),
            src: URL.createObjectURL(file), // This will be a `blob:` URL
        };
        
        // We will add the *final* reel object to the state.
        // For now, with no backend, we add the blob URL directly.
        // If we had a backend, we'd add the permanent URL from the upload.
        setReels(prevReels => [newReel, ...prevReels]);
    }, []);

    const deleteReel = useCallback((id: number) => {
        setReels(prevReels => {
            const reelToDelete = prevReels.find(reel => reel.id === id);
            // Revoke the object URL to free up memory if it's a blob
            if (reelToDelete && reelToDelete.src.startsWith('blob:')) {
                URL.revokeObjectURL(reelToDelete.src);
            }
            return prevReels.filter(reel => reel.id !== id);
        });
    }, []);

    // useMemo ensures the context value object is stable unless its dependencies change.
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