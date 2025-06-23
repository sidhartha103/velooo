'use client';

import { useEmployees } from '@/context/employee-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Briefcase } from 'lucide-react';

export default function WorkingEmployeesPage() {
    const { employees } = useEmployees();

    const workingEmployees = employees.filter(e => e.status === 'approved');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                Working Employees
            </h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Active Creator Roster</CardTitle>
                    <CardDescription>This is a list of all approved creators currently working with VeloShoot.</CardDescription>
                </CardHeader>
                <CardContent>
                    {workingEmployees.length > 0 ? (
                        <div className="space-y-4">
                            {workingEmployees.map(employee => (
                                <Card key={employee.id} className="bg-muted/50">
                                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                                            <CardDescription>{employee.role}</CardDescription>
                                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <Users className="mx-auto h-12 w-12" />
                            <p className="mt-4">No working employees found.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
