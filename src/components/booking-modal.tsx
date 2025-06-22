"use client";

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

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function BookingModal({ isOpen, onOpenChange }: BookingModalProps) {
  const occasions = ["Wedding", "Birthday", "Corporate Event", "Fashion Shoot", "Product Shoot", "Other"];

  const handleRequestCall = () => {
    console.log("Call requested!");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg text-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Submit Enquiry</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input type="text" id="fullName" className="bg-background border-border" />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input type="tel" id="contactNumber" className="bg-background border-border" />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input type="email" id="email" className="bg-background border-border" />
          </div>
          <div>
            <Label htmlFor="occasion">Occasion *</Label>
            <Select>
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
            <Input type="date" id="date" className="bg-background border-border" />
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
        <Button
          type="button"
          onClick={handleRequestCall}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
        >
          Request a Call
        </Button>
      </DialogContent>
    </Dialog>
  );
}
