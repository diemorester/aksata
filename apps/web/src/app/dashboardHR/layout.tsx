import ConfigLayoutHr from './components/ConfigLayoutHr';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigLayoutHr>{children}</ConfigLayoutHr>;
}
