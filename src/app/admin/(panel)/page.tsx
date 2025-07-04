
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Film } from "lucide-react";
import { useEmployees } from "@/context/employee-context";
import { useBookings } from "@/context/booking-context";
import { useProjects } from "@/context/project-context";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
    const { employees } = useEmployees();
    const { bookings } = useBookings();
    const { projects } = useProjects();
    
    const [shootsThisMonth, setShootsThisMonth] = useState(0);
    const [activeCreators, setActiveCreators] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Defer all calculations to the client to avoid hydration mismatch
    useEffect(() => {
        if (isClient) {
            const monthlyShoots = bookings.filter(booking => {
                const bookingDate = new Date(booking.date);
                const now = new Date();
                if (isNaN(bookingDate.getTime())) return false;
                return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
            }).length;
            setShootsThisMonth(monthlyShoots);

            const creators = employees.filter(e => e.status === 'approved').length;
            setActiveCreators(creators);

            const revenue = projects
                .filter(p => p.status === 'Completed')
                .reduce((sum, p) => sum + p.price, 0);
            setTotalRevenue(revenue);
        }
    }, [bookings, employees, projects, isClient]);


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
                        <div className="text-2xl font-bold">
                            {isClient ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalRevenue) : '₹0.00'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            From completed projects
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
                        <div className="text-2xl font-bold">{isClient ? activeCreators : 0}</div>
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
                        <div className="text-2xl font-bold">{isClient ? shootsThisMonth : 0}</div>
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
