
'use client';

import { useProjects, type Project } from '@/context/project-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, User, Calendar, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectManagementPage() {
    const { projects } = useProjects();

    const notStarted = projects.filter(p => p.status === 'Not Started');
    const inProgress = projects.filter(p => p.status === 'In Progress');
    const completed = projects.filter(p => p.status === 'Completed');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <ClipboardList className="h-8 w-8 text-primary" />
                    Project Management
                </h1>
                <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Project
                </Button>
            </div>
            
            <Tabs defaultValue="in-progress" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
                    <TabsTrigger value="not-started">Not Started ({notStarted.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="in-progress">
                    <ProjectList projects={inProgress} />
                </TabsContent>
                 <TabsContent value="not-started">
                    <ProjectList projects={notStarted} />
                </TabsContent>
                <TabsContent value="completed">
                    <ProjectList projects={completed} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

interface ProjectListProps {
    projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
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
                            <span>Due by: {format(new Date(project.dueDate), "PPP")}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                         <Button variant="outline" size="sm" disabled>View Details</Button>
                         <Button size="sm" disabled>Mark as Complete</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
