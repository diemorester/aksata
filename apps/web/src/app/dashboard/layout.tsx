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
                <div className="w-full h-full text-neutral-300">
                    {children}
                </div>
            </Sidebar>
        </div>
    );
}