
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { WhatsAppIcon } from './whatsapp-icon';

export function Footer() {
    return (
        <footer className="py-8 mt-20 border-t border-border/20">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
                <div className="flex flex-wrap justify-center items-center space-x-4 sm:space-x-6 mb-4">
                    <Link href="#" className="hover:text-primary transition-colors">Press & Blog</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram /></a>
                    <a href="https://wa.me/918985956855" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><WhatsAppIcon /></a>
                </div>
                <p>© {new Date().getFullYear()} VeloShoot. All rights reserved. <Link href="/admin/login" className="hover:text-primary transition-colors text-xs opacity-60">Admin</Link></p>
            </div>
        </footer>
    );
}
