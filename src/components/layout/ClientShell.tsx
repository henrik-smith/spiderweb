'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const SmoothScroll = dynamic(
  () => import('@/components/ui/SmoothScroll'),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor'),
  { ssr: false }
);
const AudioPlayer = dynamic(
  () => import('@/components/layout/AudioPlayer'),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress'),
  { ssr: false }
);
const ScrollVelocity = dynamic(
  () => import('@/components/ui/ScrollVelocity'),
  { ssr: false }
);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <ScrollVelocity />
      <CustomCursor />
      <Header />
      <main className="min-h-screen pb-20">{children}</main>
      <Footer />
      <AudioPlayer />
    </SmoothScroll>
  );
}
