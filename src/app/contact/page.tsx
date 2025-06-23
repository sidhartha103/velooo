import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center my-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Get In <span className="text-primary">Touch</span></h1>
                    <p className="text-muted-foreground mt-4 text-lg">We'd love to hear from you. Here's how you can reach us.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 backdrop-blur-sm border border-border shadow-lg">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-6 h-6 text-accent"/>
                                        <a href="mailto:hello@veloshoot.com" className="hover:text-primary transition-colors">hello@veloshoot.com</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-6 h-6 text-accent"/>
                                        <a href="tel:+918985956855" className="hover:text-primary transition-colors">+91 8985956855</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <MapPin className="w-6 h-6 text-accent"/>
                                        <span>Hyderabad, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">Send us a Message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
