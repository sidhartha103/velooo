import { Rocket, Diamond, ShieldCheck, Calendar, Lock, Sparkles } from 'lucide-react';
import { FeatureCard } from '@/components/feature-card';

interface FeaturesProps {
    title?: string;
}

export function Features({ title = "What Sets Us Apart" }: FeaturesProps) {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard icon={<Rocket />} title="Lightning-Fast Delivery" description="From shoot to social in minutes. Get your edited reels delivered in 10 minutes flat." />
                    <FeatureCard icon={<Diamond />} title="Cinematic Quality" description="Our pros use top-tier gear and techniques to make your content shine." />
                    <FeatureCard icon={<ShieldCheck />} title="Elite Creator Network" description="Collaborate with the industry's best, hand-selected for skill and professionalism." />
                    <FeatureCard icon={<Calendar />} title="Effortless Booking" description="Schedule, manage, and track your shoots seamlessly with our intuitive app." />
                    <FeatureCard icon={<Lock />} title="Secure & Simple Payments" description="Your transactions are protected with bank-level encryption and transparent pricing." />
                    <FeatureCard icon={<Sparkles />} title="Limitless Styles" description="From viral trends to cinematic masterpieces, our creators can do it all." />
                </div>
            </div>
        </section>
    );
}
