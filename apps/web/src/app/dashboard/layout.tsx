import { Sidebar } from "@/components/sidebar";
import { useAppSelector } from "@/redux/hooks";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Sidebar>
                <div className="w-full h-full p-3 bg-neutral-900 text-neutral-300">
                    {children}
                </div>
            </Sidebar>
        </div>
    );
}