"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
                <Label htmlFor="name" className="mb-1">Full Name</Label>
                <Input type="text" id="name" name="name" className="bg-background" />
            </div>
            <div>
                <Label htmlFor="email" className="mb-1">Email</Label>
                <Input type="email" id="email" name="email" className="bg-background" />
            </div>
            <div>
                <Label htmlFor="message" className="mb-1">Message</Label>
                <Textarea id="message" name="message" rows={4} className="bg-background" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Message
            </Button>
        </form>
    );
}
