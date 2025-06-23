"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBookings } from '@/context/booking-context';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function BookingModal({ isOpen, onOpenChange }: BookingModalProps) {
  const { addBooking } = useBookings();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [callRequestPhone, setCallRequestPhone] = useState('');

  const occasions = ["Wedding", "Birthday", "Corporate Event", "Fashion Shoot", "Product Shoot", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !occasion || !date) {
        toast({
            variant: 'destructive',
            title: 'Missing Fields',
            description: 'Please fill out all required fields.',
        });
        return;
    }
    addBooking({ name, phone, email, occasion, date });
    
    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setOccasion('');
    setDate('');

    onOpenChange(false);
  };
  
  const handleRequestCall = () => {
    if (!callRequestPhone) {
        toast({
            variant: 'destructive',
            title: 'Missing Phone Number',
            description: 'Please enter your phone number to request a call.',
        });
        return;
    }

    addBooking({
        name: 'Call Request',
        phone: callRequestPhone,
        email: 'N/A',
        occasion: 'Call Back',
        date: new Date().toISOString(),
    });

    setCallRequestPhone('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg text-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Submit Enquiry</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input type="text" id="fullName" value={name} onChange={(e) => setName(e.target.value)} className="bg-background border-border" />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input type="tel" id="contactNumber" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background border-border" />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background border-border" />
          </div>
          <div>
            <Label htmlFor="occasion">Occasion *</Label>
            <Select onValueChange={setOccasion} value={occasion}>
              <SelectTrigger id="occasion" className="bg-background border-border">
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date of the occasion *</Label>
            <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-background border-border" />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Submit Enquiry
          </Button>
        </form>
        <div className="flex items-center my-4">
          <Separator className="flex-grow bg-border" />
          <span className="flex-shrink mx-4 text-muted-foreground">OR</span>
          <Separator className="flex-grow bg-border" />
        </div>
        <div className="space-y-4">
            <div>
                <Label htmlFor="callRequestPhone" className="sr-only">Phone Number</Label>
                <Input 
                    id="callRequestPhone" 
                    type="tel" 
                    placeholder="Enter your phone number for a quick call" 
                    className="bg-background"
                    value={callRequestPhone}
                    onChange={(e) => setCallRequestPhone(e.target.value)}
                />
            </div>
            <Button
              type="button"
              onClick={handleRequestCall}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              Request a Call
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
