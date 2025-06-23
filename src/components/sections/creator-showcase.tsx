import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CreatorShowcase({ className }: { className?: string }) {
    const reels = [
        { id: 1, src: "https://placehold.co/400x600.png", category: "Events & Weddings", hint: "wedding event" },
        { id: 2, src: "https://placehold.co/400x600.png", category: "Celebrities", hint: "celebrity portrait" },
        { id: 3, src: "https://placehold.co/400x600.png", category: "Car Delivery", hint: "luxury car" },
        { id: 4, src: "https://placehold.co/400x600.png", category: "Outfit Shoots", hint: "fashion model" },
    ];

    return (
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Creator <span className="text-primary">Showcase</span></h2>
                    <p className="text-muted-foreground mt-4 text-lg">A glimpse into the stunning content our creators produce.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {reels.map(reel => (
                        <div key={reel.id} className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4] shadow-lg">
                            <Image
                                src={reel.src}
                                alt={`Reel ${reel.id}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={reel.hint}
                            />
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
