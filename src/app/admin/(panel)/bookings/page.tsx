'use client';

import { useBookings, type Booking } from '@/context/booking-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Mail, Phone, Calendar, Trash2, CalendarCheck } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingManagementPage() {
    const { bookings, updateBookingStatus, deleteBooking } = useBookings();

    const newBookings = bookings.filter(b => b.status === 'new');
    const contactedBookings = bookings.filter(b => b.status === 'contacted');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Booking Enquiries</h1>
            <Tabs defaultValue="new" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="new">New Enquiries ({newBookings.length})</TabsTrigger>
                    <TabsTrigger value="contacted">Contacted ({contactedBookings.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                    <BookingList
                        bookings={newBookings}
                        title="New Enquiries"
                        description="These are new enquiries that need to be actioned."
                        onMarkContacted={(id) => updateBookingStatus(id, 'contacted')}
                        onDelete={deleteBooking}
                    />
                </TabsContent>
                <TabsContent value="contacted">
                    <BookingList
                        bookings={contactedBookings}
                        title="Contacted Enquiries"
                        description="These enquiries have been followed up on."
                        onDelete={deleteBooking}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

interface BookingListProps {
    bookings: Booking[];
    title: string;
    description: string;
    onMarkContacted?: (id: number) => void;
    onDelete?: (id: number) => void;
}

function BookingList({ bookings, title, description, onMarkContacted, onDelete }: BookingListProps) {
    if (bookings.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <CalendarCheck className="mx-auto h-12 w-12" />
                        <p className="mt-4">No bookings here.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {bookings.map(booking => (
                    <Card key={booking.id} className="bg-muted/50">
                        <CardHeader>
                             <CardTitle className="text-lg">{booking.name}</CardTitle>
                             <CardDescription>Enquiry for: {booking.occasion}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.email}</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.phone}</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{format(new Date(booking.date), "PPP")}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end gap-2">
                            {onMarkContacted && (
                                <Button size="sm" onClick={() => onMarkContacted(booking.id)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark as Contacted
                                </Button>
                            )}
                            {onDelete && (
                                <Button variant="destructive" size="sm" onClick={() => onDelete(booking.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
