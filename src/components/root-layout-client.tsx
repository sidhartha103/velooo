
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { useEffect } from "react";
import { cn } from '@/lib/utils';
import { ShowcaseProvider } from '@/context/showcase-context';
import { AdminHeader } from '@/components/admin-header';
import { TestimonialsProvider } from '@/context/testimonials-context';
import { EmployeeProvider } from '@/context/employee-context';
import { BookingProvider } from '@/context/booking-context';
import { ProjectProvider } from '@/context/project-context';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { PageLoader } from './page-loader';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isProtectedAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && isProtectedAdminRoute) {
      router.push('/admin/login');
    }
    if (!isLoading && isAuthenticated && pathname === '/admin/login') {
      router.push('/admin');
    }
  }, [isLoading, isAuthenticated, isProtectedAdminRoute, pathname, router]);

  useEffect(() => {
    if (isProtectedAdminRoute) {
      document.body.classList.add('admin-body');
    } else {
      document.body.classList.remove('admin-body');
    }
    return () => document.body.classList.remove('admin-body');
  }, [isProtectedAdminRoute]);

  // While checking auth status on a protected route, render nothing.
  // This prevents a flash of content, and our PageLoader will show progress.
  if (isLoading && isProtectedAdminRoute) {
    return null;
  }
  
  if (!isAuthenticated && isProtectedAdminRoute) {
    return null; // Don't render children, useEffect will redirect
  }

  return <>{children}</>;
}


function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProtectedAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminLoginPage = pathname === '/admin/login';

  return (
      <AuthGuard>
          {isProtectedAdminRoute ? (
              <div className="min-h-screen flex flex-col">
                  <AdminHeader />
                  <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                      {children}
                  </main>
              </div>
          ) : (
              <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className={cn("flex-grow", isAdminLoginPage && "flex items-center justify-center")}>{children}</main>
                  <Footer />
              </div>
          )}
      </AuthGuard>
  )
}


export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShowcaseProvider>
        <TestimonialsProvider>
          <EmployeeProvider>
            <BookingProvider>
              <ProjectProvider>
                <PageLoader />
                <AppLayout>{children}</AppLayout>
              </ProjectProvider>
            </BookingProvider>
          </EmployeeProvider>
        </TestimonialsProvider>
      </ShowcaseProvider>
    </AuthProvider>
  )
}
