import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

export default function DiscoverPage() {
    const reels = [
        { id: 1, src: "https://placehold.co/400x600.png", category: "Events & Weddings", hint: "wedding event" },
        { id: 2, src: "https://placehold.co/400x600.png", category: "Celebrities", title: "Celebrity Highlights", hint: "celebrity portrait" },
        { id: 3, src: "https://placehold.co/400x600.png", category: "Car Delivery", isVideo: true, hint: "luxury car" },
        { id: 4, src: "https://placehold.co/400x600.png", category: "Outfit Shoots", hint: "fashion model" },
        { id: 5, src: "https://placehold.co/400x600.png", category: "Concerts", hint: "music concert" },
        { id: 6, src: "https://placehold.co/400x600.png", category: "Events & Weddings", hint: "party event" },
        { id: 7, src: "https://placehold.co/400x600.png", category: "Outfit Shoots", isVideo: true, hint: "street style" },
        { id: 8, src: "https://placehold.co/400x600.png", category: "Celebrities", hint: "red carpet" },
    ];

    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center my-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">The Creator <span className="text-primary">Showcase</span></h1>
                    <p className="text-muted-foreground mt-4 text-lg">Dive into a world of incredible content.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                    {reels.map(reel => (
                        <div key={reel.id} className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4] shadow-lg">
                            <Image
                                src={reel.src}
                                alt={reel.title || `Reel ${reel.id}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={reel.hint}
                            />
                            {reel.isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity group-hover:opacity-100 opacity-0">
                                    <PlayCircle className="w-16 h-16 text-white opacity-80" />
                                </div>
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
