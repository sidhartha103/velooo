
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react';

export interface Project {
    id: number;
    title: string;
    clientName: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    price: number;
}

const initialProjects: Project[] = [
    {
        id: 1,
        title: 'Pre-Wedding Shoot',
        clientName: 'Alice & Bob',
        dueDate: '2024-08-10',
        status: 'In Progress',
        price: 1500,
    },
    {
        id: 2,
        title: 'Corporate Headshots',
        clientName: 'TechCorp Inc.',
        dueDate: '2024-08-05',
        status: 'Not Started',
        price: 800,
    },
    {
        id: 3,
        title: 'Fashion Lookbook',
        clientName: 'StyleWear Co.',
        dueDate: '2024-07-28',
        status: 'Completed',
        price: 2200,
    },
     {
        id: 4,
        title: 'Product Launch Video',
        clientName: 'Innovate LLC',
        dueDate: '2024-08-20',
        status: 'Not Started',
        price: 3500,
    },
];

interface ProjectContextType {
    projects: Project[];
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: number, updates: Partial<Omit<Project, 'id'>>) => void;
    deleteProject: (id: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedProjects = localStorage.getItem('projects');
            if (storedProjects) {
                setProjects(JSON.parse(storedProjects));
            } else {
                localStorage.setItem('projects', JSON.stringify(initialProjects));
            }
        } catch (error) {
            console.error("Failed to load projects from localStorage", error);
            setProjects(initialProjects);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem('projects', JSON.stringify(projects));
            } catch (error) {
                console.error("Failed to write projects to localStorage", error);
            }
        }
    }, [projects, isInitialized]);

    const addProject = useCallback((project: Omit<Project, 'id'>) => {
        const newProject: Project = { ...project, id: Date.now() };
        setProjects(prev => [newProject, ...prev]);
    }, []);

    const updateProject = useCallback((id: number, updates: Partial<Omit<Project, 'id'>>) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }, []);

    const deleteProject = useCallback((id: number) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    }, []);
    
    const value = useMemo(() => ({ projects, addProject, updateProject, deleteProject }), [projects, addProject, updateProject, deleteProject]);

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
