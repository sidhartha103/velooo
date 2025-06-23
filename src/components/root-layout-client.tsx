'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { useEffect } from "react";
import { cn } from '@/lib/utils';
import { ShowcaseProvider } from '@/context/showcase-context';
import { AdminHeader } from '@/components/admin-header';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProtectedAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isProtectedAdminRoute) {
      document.body.classList.add('admin-body');
    } else {
      document.body.classList.remove('admin-body');
    }

    return () => {
      document.body.classList.remove('admin-body');
    }
  }, [isProtectedAdminRoute]);

  return (
    <ShowcaseProvider>
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
    </ShowcaseProvider>
  )
}
