import ConfigLayoutUser from './settings/components/ConfigLayoutUser';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigLayoutUser>{children}</ConfigLayoutUser>;
}
