
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTestimonials } from '@/context/testimonials-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Upload } from 'lucide-react';

export default function FeedbackPage() {
    const { addTestimonial } = useTestimonials();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !role || !text) {
            toast({
                variant: 'destructive',
                title: 'Missing fields',
                description: 'Please fill out all required fields.',
            });
            return;
        }

        addTestimonial({
            name,
            role,
            text,
            avatar: preview || `https://placehold.co/100x100.png`,
            hint: 'user portrait',
        });

        toast({
            title: 'Feedback Submitted!',
            description: 'Thank you for your feedback. It will be reviewed by our team.',
        });

        // Reset form
        setName('');
        setRole('');
        setText('');
        setFile(null);
        setPreview(null);
        const fileInput = document.getElementById('avatar') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center my-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Share Your <span className="text-primary">Experience</span></h1>
                    <p className="text-muted-foreground mt-4 text-lg">We value your feedback. Let us know how we're doing!</p>
                </div>

                <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <MessageSquare className="w-6 h-6 text-accent" />
                           <span>Feedback Form</span>
                        </CardTitle>
                        <CardDescription>Your feedback helps us improve.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Your Role (e.g. "Content Creator")</Label>
                                    <Input id="role" value={role} onChange={e => setRole(e.target.value)} required />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="text">Feedback</Label>
                                <Textarea id="text" value={text} onChange={e => setText(e.target.value)} rows={5} required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="avatar">Profile Picture (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    {preview ? (
                                        <Image src={preview} alt="Avatar preview" width={64} height={64} className="rounded-full h-16 w-16 object-cover" />
                                    ) : (
                                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                            <Upload />
                                        </div>
                                    )}
                                    <Input id="avatar" type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Submit Feedback</Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
