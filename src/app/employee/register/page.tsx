
'use client';

import { useState } from 'react';
import { useEmployees } from '@/context/employee-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EmployeeRegistrationPage() {
    const { addEmployee } = useEmployees();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !role) {
            toast({
                variant: 'destructive',
                title: 'Missing fields',
                description: 'Please fill out all required fields.',
            });
            return;
        }

        addEmployee({ name, email, role });

        toast({
            title: 'Registration Submitted!',
            description: 'Thank you for registering. Your application will be reviewed by an admin.',
        });

        // Reset form
        setName('');
        setEmail('');
        setRole('');
    };
    
    return (
        <div className="min-h-screen">
            <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center my-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Join Our <span className="text-primary">Creator Team</span></h1>
                    <p className="text-muted-foreground mt-4 text-lg">Register as a creator and start your journey with VeloShoot.</p>
                </div>
                <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <UserPlus className="w-6 h-6 text-accent" />
                           <span>Creator Registration</span>
                        </CardTitle>
                        <CardDescription>Fill out the form below to apply.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Primary Role</Label>
                                 <Select onValueChange={setRole} value={role}>
                                    <SelectTrigger id="role" className="w-full">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Photographer">Photographer</SelectItem>
                                        <SelectItem value="Videographer">Videographer</SelectItem>
                                        <SelectItem value="Editor">Editor</SelectItem>
                                        <SelectItem value="Drone Operator">Drone Operator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Submit Application</Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
