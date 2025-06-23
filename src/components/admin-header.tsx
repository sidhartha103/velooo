
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Lightbulb, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export function AdminHeader() {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/planner', icon: Lightbulb, label: 'AI Shoot Planner' },
    ];

    return (
        <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/admin" className="text-xl font-bold cursor-pointer text-foreground">
                        VeloShoot Admin
                    </Link>

                    {/* Centered Nav for Desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                        <nav className="flex items-center space-x-1 bg-background rounded-full p-1 border border-border">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-sm font-medium",
                                        pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    )}>
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        {/* Mobile Nav */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] bg-card border-l-border p-0">
                                    <nav className="flex flex-col h-full">
                                        <div className="p-4 border-b border-border">
                                            <Link href="/admin" className="text-xl font-bold cursor-pointer text-foreground">
                                                VeloShoot Admin
                                            </Link>
                                        </div>
                                        <div className="flex-grow p-4 space-y-2">
                                            {navItems.map((item) => (
                                                <SheetClose asChild key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "flex items-center gap-4 p-3 rounded-lg text-base transition-colors",
                                                            pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'hover:bg-muted/50'
                                                        )}
                                                    >
                                                        <item.icon size={20} />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                        {/* Placeholder to balance flexbox in desktop view */}
                        <div className="hidden md:block w-10 h-10" />
                    </div>
                </div>
            </div>
        </header>
    );
}
