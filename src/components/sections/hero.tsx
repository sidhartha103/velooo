import { Button } from '@/components/ui/button';

interface HeroProps {
    onBookNowClick: () => void;
}

export function Hero({ onBookNowClick }: HeroProps) {
    return (
        <section className="text-center pt-32 md:pt-40 pb-10 md:pb-20">
            <div className="container mx-auto px-4">
                <p className="text-lg text-muted-foreground">Reels, Ready in a</p>
                <h1 className="text-6xl md:text-8xl font-bold my-4">
                    <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"> Snap. </span>
                </h1>
                <Button onClick={onBookNowClick} size="lg" className="bg-primary hover:bg-primary/90 mt-6 px-10 py-3 text-lg font-semibold">
                    Book a Shoot Now
                </Button>
                <p className="mt-6 text-muted-foreground text-sm tracking-wider"> Shot on  iPhone </p>
            </div>
        </section>
    );
}
