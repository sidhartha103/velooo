'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { useEffect } from "react";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProtectedAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

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

  if (isProtectedAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
