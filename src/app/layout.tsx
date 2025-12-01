import './globals.css';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parks & Trails Companion',
  description: 'Explore Toronto parks and trails via open data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
