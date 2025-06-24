
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';

export interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'pending' | 'approved';
}

const initialEmployees: Employee[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Photographer",
        status: 'approved'
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Videographer",
        status: 'pending'
    },
];

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id' | 'status'>) => void;
    addApprovedEmployee: (employee: Omit<Employee, 'id' | 'status'>) => void;
    updateEmployee: (id: number, updates: Partial<Omit<Employee, 'id' | 'status'>>) => void;
    approveEmployee: (id: number) => void;
    deleteEmployee: (id: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedEmployees = localStorage.getItem('employees');
            if (storedEmployees) {
                setEmployees(JSON.parse(storedEmployees));
            } else {
                setEmployees(initialEmployees);
            }
        } catch (error) {
            console.error("Failed to load employees from localStorage", error);
            setEmployees(initialEmployees);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem('employees', JSON.stringify(employees));
            } catch (error) {
                console.error("Failed to write employees to localStorage", error);
            }
        }
    }, [employees, isInitialized]);

    const addEmployee = useCallback((employee: Omit<Employee, 'id' | 'status'>) => {
        const newEmployee: Employee = { ...employee, id: Date.now(), status: 'pending' };
        setEmployees(prev => [newEmployee, ...prev]);
    }, []);

    const addApprovedEmployee = useCallback((employee: Omit<Employee, 'id' | 'status'>) => {
        const newEmployee: Employee = { ...employee, id: Date.now(), status: 'approved' };
        setEmployees(prev => [newEmployee, ...prev]);
    }, []);

    const updateEmployee = useCallback((id: number, updates: Partial<Omit<Employee, 'id' | 'status'>>) => {
        setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    }, []);
    
    const approveEmployee = useCallback((id: number) => {
        setEmployees(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' } : e));
    }, []);

    const deleteEmployee = useCallback((id: number) => {
        setEmployees(prev => prev.filter(e => e.id !== id));
    }, []);
    
    const value = useMemo(() => ({ employees, addEmployee, addApprovedEmployee, updateEmployee, approveEmployee, deleteEmployee }), [employees, addEmployee, addApprovedEmployee, updateEmployee, approveEmployee, deleteEmployee]);

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within a EmployeeProvider');
    }
    return context;
}
