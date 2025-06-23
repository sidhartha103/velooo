import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
    return (
        <div className="flex items-center justify-center py-24">
            <Card className="max-w-md mx-auto w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary rounded-full p-3 w-fit mb-4">
                        <LogIn className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@veloshoot.com" required className="bg-muted"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required className="bg-muted"/>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
