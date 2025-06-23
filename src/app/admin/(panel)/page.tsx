'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Film } from "lucide-react";
import { useEmployees } from "@/context/employee-context";
import { useBookings } from "@/context/booking-context";

export default function AdminDashboardPage() {
    const { employees } = useEmployees();
    const { bookings } = useBookings();

    const activeCreators = employees.filter(e => e.status === 'approved').length;

    const shootsThisMonth = bookings.filter(booking => {
        // An invalid date string will result in an invalid Date object
        const bookingDate = new Date(booking.date);
        const now = new Date();
        // Check if the date is valid before comparing
        if (isNaN(bookingDate.getTime())) return false;
        return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
    }).length;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            (Static data)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Creators
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCreators}</div>
                        <p className="text-xs text-muted-foreground">
                            Total approved creators
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Shoots This Month</CardTitle>
                        <Film className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{shootsThisMonth}</div>
                        <p className="text-xs text-muted-foreground">
                            based on booking date
                        </p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Welcome to your Admin Panel</CardTitle>
                    <CardDescription>From here, you can manage your application. Use the sidebar to navigate to different sections.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
