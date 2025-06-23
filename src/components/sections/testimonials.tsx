
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTestimonials } from "@/context/testimonials-context";

export function Testimonials({ className }: { className?: string }) {
    const { testimonials } = useTestimonials();
    const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

    // Duplicate for infinite scroll effect
    const testimonialsToDisplay = approvedTestimonials.length > 0 ? [...approvedTestimonials, ...approvedTestimonials] : [];

    if (approvedTestimonials.length === 0) {
        return null; // Don't render the section if there are no approved testimonials
    }

    return (
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold">What Our <span className="text-primary">Partners Say</span></h2>
                    <p className="text-muted-foreground mt-4 text-lg">Real stories from creators and clients who love VeloShoot.</p>
                </div>
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="flex w-max animate-scroll-x hover:[animation-play-state:paused]">
                        {testimonialsToDisplay.map((testimonial, index) => (
                            <Card key={`${testimonial.id}-${index}`} className="bg-card border-border/50 backdrop-blur-sm w-[clamp(300px,30vw,400px)] mx-4 shrink-0">
                                <CardContent className="pt-6">
                                    <blockquote className="text-muted-foreground mb-6 border-l-2 border-primary pl-4 italic">"{testimonial.text}"</blockquote>
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
