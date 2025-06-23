import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Testimonials({ className }: { className?: string }) {
    const testimonialsData = [
        {
            name: "Sarah L.",
            role: "Fashion Influencer",
            avatar: "https://placehold.co/100x100.png",
            hint: "woman portrait",
            text: "VeloStream is a game-changer. The 10-minute turnaround for high-quality reels is unheard of. It's completely streamlined my content creation process!"
        },
        {
            name: "David C.",
            role: "Event Planner",
            avatar: "https://placehold.co/100x100.png",
            hint: "man portrait",
            text: "I booked a creator for a corporate event, and the results were phenomenal. The professionalism and quality exceeded all expectations. Highly recommended."
        },
        {
            name: "Maya G.",
            role: "Travel Vlogger",
            avatar: "https://placehold.co/100x100.png",
            hint: "woman smiling",
            text: "The platform is so easy to use, and the creator network is top-notch. I can always find the perfect match for my style, no matter where I am."
        }
    ];

    const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

    return (
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">What Our <span className="text-primary">Partners Say</span></h2>
                    <p className="text-muted-foreground mt-4 text-lg">Real stories from creators and clients who love VeloStream.</p>
                </div>
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="flex w-max animate-scroll-x hover:[animation-play-state:paused]">
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-card border-border/50 backdrop-blur-sm w-[clamp(300px,30vw,400px)] mx-4 shrink-0">
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
