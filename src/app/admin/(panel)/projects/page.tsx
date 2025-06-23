
'use client';

import { useProjects, type Project } from '@/context/project-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, User, Calendar, PlusCircle, DollarSign, Pencil, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProjectManagementPage() {
    const { projects, addProject, updateProject, deleteProject } = useProjects();
    const { toast } = useToast();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    const notStarted = projects.filter(p => p.status === 'Not Started');
    const inProgress = projects.filter(p => p.status === 'In Progress');
    const completed = projects.filter(p => p.status === 'Completed');

    const handleAddProject = (data: Omit<Project, 'id'>) => {
        addProject(data);
        toast({ title: 'Project Added', description: 'The new project has been created.' });
    };

    const handleUpdateProject = (id: number, data: Partial<Omit<Project, 'id'>>) => {
        updateProject(id, data);
        toast({ title: 'Project Updated', description: 'The project details have been saved.' });
    };

    const handleDeleteProject = (id: number) => {
        deleteProject(id);
        toast({ variant: 'destructive', title: 'Project Deleted', description: 'The project has been removed.' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <ClipboardList className="h-8 w-8 text-primary" />
                    Project Management
                </h1>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Project</DialogTitle>
                            <DialogDescription>
                                Fill out the details for the new project.
                            </DialogDescription>
                        </DialogHeader>
                        <ProjectForm
                            onSubmit={handleAddProject}
                            onClose={() => setIsAddModalOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            
            <Tabs defaultValue="in-progress" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
                    <TabsTrigger value="not-started">Not Started ({notStarted.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="in-progress">
                    <ProjectList projects={inProgress} onEdit={setProjectToEdit} onDelete={handleDeleteProject} />
                </TabsContent>
                 <TabsContent value="not-started">
                    <ProjectList projects={notStarted} onEdit={setProjectToEdit} onDelete={handleDeleteProject} />
                </TabsContent>
                <TabsContent value="completed">
                    <ProjectList projects={completed} onEdit={setProjectToEdit} onDelete={handleDeleteProject} />
                </TabsContent>
            </Tabs>

            <Dialog open={!!projectToEdit} onOpenChange={(isOpen) => !isOpen && setProjectToEdit(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                            Update the details for "{projectToEdit?.title}".
                        </DialogDescription>
                    </DialogHeader>
                    <ProjectForm
                        project={projectToEdit!}
                        onSubmit={(data) => handleUpdateProject(projectToEdit!.id, data)}
                        onClose={() => setProjectToEdit(null)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

interface ProjectListProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: number) => void;
}

function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-12 border rounded-lg mt-2 bg-card">
                <ClipboardList className="mx-auto h-12 w-12" />
                <p className="mt-4">No projects in this category.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 mt-2 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
                <Card key={project.id} className="flex flex-col">
                    <CardHeader>
                         <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge 
                                variant={
                                    project.status === 'Completed' ? 'default' : 
                                    project.status === 'In Progress' ? 'secondary' : 'outline'
                                }
                                className={
                                    project.status === 'Completed' ? 'bg-green-600/80 border-transparent text-white' : ''
                                }
                            >
                                {project.status}
                            </Badge>
                         </div>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{project.clientName}</span>
                        </div>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Due by: {format(parseISO(project.dueDate), "PPP")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(project.price)}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                         <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                         </Button>
                         <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                         </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

// --- ProjectForm Component ---

interface ProjectFormProps {
    project?: Project;
    onClose: () => void;
    onSubmit: (data: Omit<Project, 'id'>) => void;
}

function ProjectForm({ project, onClose, onSubmit }: ProjectFormProps) {
    const [title, setTitle] = useState('');
    const [clientName, setClientName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState<Project['status']>('Not Started');
    const [price, setPrice] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setClientName(project.clientName);
            setDueDate(project.dueDate);
            setStatus(project.status);
            setPrice(project.price.toString());
        } else {
            setTitle('');
            setClientName('');
            setDueDate('');
            setStatus('Not Started');
            setPrice('');
        }
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const priceNumber = parseFloat(price);
        if (!title || !clientName || !dueDate || !status || isNaN(priceNumber)) {
            toast({
                variant: 'destructive',
                title: 'Missing fields',
                description: 'Please fill out all fields correctly.',
            });
            return;
        }
        onSubmit({ title, clientName, dueDate, status, price: priceNumber });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="e.g. 1500" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                 <Select onValueChange={(value) => setStatus(value as Project['status'])} value={status} required>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                </DialogClose>
                <Button type="submit">{project ? 'Save Changes' : 'Add Project'}</Button>
            </DialogFooter>
        </form>
    );
}
