
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Lightbulb, Menu, User, LogOut, Clapperboard, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/planner', icon: Lightbulb, label: 'AI Shoot Planner' },
        { href: '/admin/showcase', icon: Clapperboard, label: 'Showcase' },
        { href: '/admin/feedback', icon: MessageSquare, label: 'Feedback' },
    ];

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/admin" className="text-xl font-bold cursor-pointer text-foreground">
                        VeloShoot Admin
                    </Link>

                    {/* Centered Nav for Desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                        <nav className="flex items-center space-x-2 bg-background rounded-full p-1 border border-border">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}
                                    className={cn(
                                        "p-2 rounded-full transition-colors",
                                        pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    )}>
                                    <item.icon size={20} />
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Profile & Logout for Desktop */}
                        <div className="hidden md:block">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback>A</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">Admin</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                admin@veloshoot.com
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

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
                                        <div className="border-t border-border p-4 space-y-2">
                                             <SheetClose asChild>
                                                <Link href="#" className="flex items-center gap-4 p-3 rounded-lg text-base hover:bg-muted/50">
                                                    <User size={20} />
                                                    <span>Profile</span>
                                                </Link>
                                             </SheetClose>
                                             <SheetClose asChild>
                                                <Button variant="ghost" onClick={handleLogout} className="w-full justify-start p-3 text-base">
                                                    <LogOut size={20} className="mr-4" />
                                                    <span>Log out</span>
                                                </Button>
                                             </SheetClose>
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
