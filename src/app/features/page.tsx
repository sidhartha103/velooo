import Image from 'next/image';
import { BarChart2, Briefcase, Gift } from 'lucide-react';
import { Features } from '@/components/sections/features';
import { GetStarted } from '@/components/sections/get-started';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <section className="my-24">
                    <h2 className="text-3xl font-bold text-center mb-12">For Our Creator <span className="text-primary">Partners</span></h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <FeaturePartnerCard icon={<BarChart2 className="w-12 h-12 mx-auto text-accent mb-4" />} title="Your Business, Your Insights" description="Master your growth with a powerful dashboard tracking every view, earning, and metric that matters." />
                        <FeaturePartnerCard icon={<Briefcase className="w-12 h-12 mx-auto text-accent mb-4" />} title="Work On Your Terms" description="Your schedule is sacred. Accept bookings that fit your life and manage your availability with a single tap." />
                        <FeaturePartnerCard icon={<Gift className="w-12 h-12 mx-auto text-accent mb-4" />} title="Unlock Your Potential" description="Join an elite community and get VIP access to brand deals, industry workshops, and exclusive events." />
                    </div>
                </section>
                
                <Features title="Why Choose Us?" />
                <GetStarted />
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
