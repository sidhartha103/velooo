'use client';

import { useEmployees, type Employee } from '@/context/employee-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Briefcase, PlusCircle, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function WorkingEmployeesPage() {
    const { employees, addApprovedEmployee, updateEmployee, deleteEmployee } = useEmployees();
    const { toast } = useToast();

    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

    const workingEmployees = useMemo(() => {
        return employees
            .filter(e => e.status === 'approved')
            .filter(e => 
                e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [employees, searchQuery]);


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
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Briefcase className="h-8 w-8 text-primary" />
                    Working Employees
                </h1>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Active Creator Roster</CardTitle>
                    <CardDescription>This is a list of all approved creators currently working with VeloShoot.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or role..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 w-full"
                            />
                        </div>
                         <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Employee
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Employee</DialogTitle>
                                    <DialogDescription>
                                        Add a new creator directly to the active roster. They will be approved automatically.
                                    </DialogDescription>
                                </DialogHeader>
                                <EmployeeForm 
                                    onClose={() => setIsAddModalOpen(false)} 
                                    onSubmit={(data) => {
                                        addApprovedEmployee(data);
                                        toast({ title: 'Employee Added', description: 'The new employee has been added and approved.' });
                                    }} 
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

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
                                    <CardFooter className="justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setEmployeeToEdit(employee)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(employee.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <Users className="mx-auto h-12 w-12" />
                            <p className="mt-4">{searchQuery ? 'No employees match your search.' : 'No working employees found.'}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={!!employeeToEdit} onOpenChange={(isOpen) => !isOpen && setEmployeeToEdit(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <DialogDescription>
                            Update the details for {employeeToEdit?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <EmployeeForm
                        employee={employeeToEdit!}
                        onClose={() => setEmployeeToEdit(null)}
                        onSubmit={(data) => {
                            if (employeeToEdit) {
                                updateEmployee(employeeToEdit.id, data);
                                toast({ title: 'Employee Updated', description: 'The employee details have been saved.' });
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

interface EmployeeFormProps {
    employee?: Employee;
    onClose: () => void;
    onSubmit: (data: Omit<Employee, 'id' | 'status'>) => void;
}

function EmployeeForm({ employee, onClose, onSubmit }: EmployeeFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setRole(employee.role);
        } else {
            setName('');
            setEmail('');
            setRole('');
        }
    }, [employee]);

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
        onSubmit({ name, email, role });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
                 <Select onValueChange={setRole} value={role} required>
                    <SelectTrigger id="role" className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Photographer">Photographer</SelectItem>
                        <SelectItem value="Videographer">Videographer</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Drone Operator">Drone Operator</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                </DialogClose>
                <Button type="submit">{employee ? 'Save Changes' : 'Add Employee'}</Button>
            </DialogFooter>
        </form>
    );
}
