
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface Project {
    id: number;
    title: string;
    clientName: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
}

const initialProjects: Project[] = [
    {
        id: 1,
        title: 'Pre-Wedding Shoot',
        clientName: 'Alice & Bob',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
        status: 'In Progress',
    },
    {
        id: 2,
        title: 'Corporate Headshots',
        clientName: 'TechCorp Inc.',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
        status: 'Not Started',
    },
    {
        id: 3,
        title: 'Fashion Lookbook',
        clientName: 'StyleWear Co.',
        dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        status: 'Completed',
    },
     {
        id: 4,
        title: 'Product Launch Video',
        clientName: 'Innovate LLC',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
        status: 'Not Started',
    },
];

interface ProjectContextType {
    projects: Project[];
    // Future CRUD functions can be added here
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    // In a real app, you'd have functions to modify projects,
    // which would also interact with localStorage or a backend.
    
    const value = useMemo(() => ({ projects }), [projects]);

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
}
