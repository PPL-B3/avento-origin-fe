'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}
      className="w-screen h-screen flex flex-col items-center justify-center"
    >
      <b>Avento Origin</b>
      <Link href="/upload-document">
        <Button variant="default">Upload Document</Button>
      </Link>
    </div>
  );
}
