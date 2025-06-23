
'use client';

import { useEmployees, type Employee } from '@/context/employee-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Check, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeManagementPage() {
    const { employees, approveEmployee, deleteEmployee } = useEmployees();
    const { toast } = useToast();

    const pending = employees.filter(e => e.status === 'pending');
    const approved = employees.filter(e => e.status === 'approved');

    const handleApprove = (id: number) => {
        approveEmployee(id);
        toast({ title: 'Employee Approved', description: 'The employee can now access the portal.' });
    };

    const handleDelete = (id: number) => {
        deleteEmployee(id);
        toast({
            variant: 'destructive',
            title: 'Employee Deleted',
            description: 'The employee has been permanently removed.',
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Employee Management</h1>
            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pending">Pending Approval ({pending.length})</TabsTrigger>
                    <TabsTrigger value="approved">Approved Employees ({approved.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <EmployeeList
                        employees={pending}
                        title="Pending Applications"
                        description="Review new creator applications."
                        onApprove={handleApprove}
                        onDelete={handleDelete}
                    />
                </TabsContent>
                <TabsContent value="approved">
                    <EmployeeList
                        employees={approved}
                        title="Approved Creators"
                        description="These creators are active on the platform."
                        onDelete={handleDelete}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

interface EmployeeListProps {
    employees: Employee[];
    title: string;
    description: string;
    onApprove?: (id: number) => void;
    onDelete?: (id: number) => void;
}

function EmployeeList({ employees, title, description, onApprove, onDelete }: EmployeeListProps) {
    if (employees.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <Users className="mx-auto h-12 w-12" />
                        <p className="mt-4">No employees here.</p>
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
                {employees.map(employee => (
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
                        <CardFooter className="justify-end gap-2">
                            {onApprove && (
                                <Button size="sm" onClick={() => onApprove(employee.id)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                </Button>
                            )}
                            {onDelete && (
                                <Button variant="destructive" size="sm" onClick={() => onDelete(employee.id)}>
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
