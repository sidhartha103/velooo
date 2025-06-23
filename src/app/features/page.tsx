import Image from 'next/image';
import { BarChart2, Briefcase, Gift } from 'lucide-react';
import { Features } from '@/components/sections/features';
import { GetStarted } from '@/components/sections/get-started';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center my-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-foreground mt-2">Your Content, <span className="text-primary">Supercharged.</span></h1>
                    <div className="mt-8 flex justify-center">
                        <div className="w-full max-w-3xl aspect-video bg-card border-4 border-border rounded-xl flex items-center justify-center p-2 shadow-lg">
                           <Image src="https://placehold.co/600x400.png" alt="App Screenshot" width={600} height={338} className="rounded-lg w-full h-auto" data-ai-hint="app interface" />
                        </div>
                    </div>
                </div>

                <section className="my-24">
                    <h2 className="text-3xl font-bold text-center mb-12">For Our Creator <span className="text-primary">Partners</span></h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <FeaturePartnerCard icon={<BarChart2 className="w-12 h-12 mx-auto text-accent mb-4" />} title="Your Business, Your Insights" description="Master your growth with a powerful dashboard tracking every view, earning, and metric that matters." />
                        <FeaturePartnerCard icon={<Briefcase className="w-12 h-12 mx-auto text-accent mb-4" />} title="Work On Your Terms" description="Your schedule is sacred. Accept bookings that fit your life and manage your availability with a single tap." />
                        <FeaturePartnerCard icon={<Gift className="w-12 h-12 mx-auto text-accent mb-4" />} title="Unlock Your Potential" description="Join an elite community and get VIP access to brand deals, industry workshops, and exclusive events." />
                    </div>
                </section>
                
                <section className="my-24 bg-card/50">
                    <h2 className="text-3xl font-bold text-center mb-12">Book with Total <span className="text-primary">Peace of Mind</span></h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-card border border-border p-4 rounded-lg">
                           <Image src="https://placehold.co/600x400.png" alt="App interface for booking" width={600} height={338} className="rounded-lg w-full h-auto" data-ai-hint="booking calendar" />
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <Image src="https://placehold.co/600x400.png" alt="App interface showing calendar" width={600} height={338} className="rounded-lg w-full h-auto" data-ai-hint="analytics dashboard" />
                        </div>
                    </div>
                </section>
                
                <Features title="Why Choose Us?" />
                <GetStarted className="bg-card/50" />
            </main>
        </div>
    );
}

const FeaturePartnerCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-card border border-border p-8 rounded-lg">
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);
