'use client';

import dynamic from 'next/dynamic';
import CitiesMarquee from '@/components/home/CitiesMarquee';

const VideoHero = dynamic(
  () => import('@/components/home/VideoHero'),
  { ssr: false }
);
const TheSound = dynamic(
  () => import('@/components/home/TheSound'),
  { ssr: false }
);
const TheStory = dynamic(
  () => import('@/components/home/TheStory'),
  { ssr: false }
);
const LiveSection = dynamic(
  () => import('@/components/home/LiveSection'),
  { ssr: false }
);
const ConnectSection = dynamic(
  () => import('@/components/home/ConnectSection'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <VideoHero />
      <CitiesMarquee />
      <TheSound />
      <TheStory />
      <LiveSection />
      <ConnectSection />
    </>
  );
}
