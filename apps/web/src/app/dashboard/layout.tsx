import { AppSidebar } from "@/components/ui/appSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppSidebar />
            <div className="w-full h-full bg-neutral-800 text-neutral-300">
                <SidebarTrigger />
                {children}
            </div>
        </>
    );
}