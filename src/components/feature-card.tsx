import { type ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm">
            <div className="text-accent mb-4 w-10 h-10 flex items-center justify-center bg-accent/10 rounded-lg">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
