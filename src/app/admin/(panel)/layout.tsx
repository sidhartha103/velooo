
import { AdminHeader } from '@/components/admin-header';

export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <AdminHeader />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
