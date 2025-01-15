import { SidebarHR } from "./data-absensi/components/sidebarHR";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <SidebarHR>
                <div className="w-full h-full">
                    {children}
                </div>
            </SidebarHR>
        </div>
    )
}