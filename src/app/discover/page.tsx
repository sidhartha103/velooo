'use client';

import Image from 'next/image';
import type React from 'react';
import { useShowcase } from '@/context/showcase-context';

export default function DiscoverPage() {
    const { reels } = useShowcase();

    const handleMediaClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if ((video as any).webkitRequestFullscreen) { /* Safari */
                (video as any).webkitRequestFullscreen();
            } else if ((video as any).msRequestFullscreen) { /* IE11 */
                (video as any).msRequestFullscreen();
            }
        }
    };

    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center my-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">The Creator <span className="text-primary">Showcase</span></h1>
                    <p className="text-muted-foreground mt-4 text-lg">Dive into a world of incredible content.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                    {reels.map(reel => (
                        <div key={reel.id} className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4] shadow-lg" onClick={reel.isVideo ? handleMediaClick : undefined}>
                            {reel.isVideo ? (
                                <video src={reel.src} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loop muted autoPlay playsInline />
                            ) : (
                                <Image
                                    src={reel.src}
                                    alt={reel.title || reel.category}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={reel.hint}
                                />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                                <h3 className="text-white text-lg font-semibold">{reel.title || reel.category}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
