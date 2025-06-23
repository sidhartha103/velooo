"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GalleryHorizontal, Wand2, AtSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/discover', icon: GalleryHorizontal, label: 'Discover' },
        { href: '/features', icon: Wand2, label: 'Features' },
        { href: '/contact', icon: AtSign, label: 'Contact' },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-2xl font-bold cursor-pointer text-primary">
                        VeloShoot
                    </Link>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                        <nav className="flex items-center space-x-2 bg-black/20 rounded-full p-1 border border-white/10">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}
                                    className={cn(
                                        "p-2 rounded-full transition-colors",
                                        pathname === item.href ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/20'
                                    )}>
                                    <item.icon size={20} />
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div></div>
                </div>
            </div>
        </header>
    );
}
