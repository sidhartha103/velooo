'use client';

import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/showcase-context';

export function CreatorShowcase({ className }: { className?: string }) {
    const { reels: allReels } = useShowcase();
    const reels = allReels.slice(0, 4);

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
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold">Creator <span className="text-primary">Showcase</span></h2>
                    <p className="text-muted-foreground mt-4 text-lg">A glimpse into the stunning content our creators produce.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {reels.map(reel => (
                        <div key={reel.id} className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4] shadow-lg" onClick={reel.isVideo ? handleMediaClick : undefined}>
                           {reel.isVideo ? (
                                <video src={reel.src} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loop muted autoPlay playsInline />
                            ) : (
                                <Image
                                    src={reel.src}
                                    alt={reel.category}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={reel.hint}
                                />
                            )}
                             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                                <h3 className="text-white text-lg font-semibold">{reel.category}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/discover">
                            Discover More
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
