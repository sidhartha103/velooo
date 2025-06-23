import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function GetStarted({ className }: { className?: string }) {
    return (
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8 backdrop-blur-sm shadow-lg">
                    <h2 className="text-3xl font-bold text-foreground">Book Your First <span className="text-primary">Complimentary</span> Shoot</h2>
                    <p className="text-muted-foreground mt-4 mb-8">Experience the VeloShoot difference with a free shoot. No strings attached.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Input type="email" placeholder="Enter your email" className="bg-background w-full sm:w-auto flex-grow" />
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Book Your Free Shoot
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
