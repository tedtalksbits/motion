import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen bg-black/50 text-foreground overflow-hidden'>
      <header className='fixed w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-black/10'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image
              src='/images/compass.png'
              alt='Compass Logo'
              width={32}
              height={32}
            />
            <span className='text-xl font-bold'>Compass</span>
          </div>
          <nav className='hidden md:flex items-center gap-6'></nav>
          <div className='flex items-center gap-4'>
            <Link
              href='/sign-in'
              className='text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block'
            >
              Sign in
            </Link>
            <Link href='/sign-up'>
              <Button className='bg-white text-black hover:bg-zinc-200'>
                Get started
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <footer className='border-t border-white/10 bg-black/20 backdrop-blur-xl'>
        <div className='container py-8 px-4 md:px-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Image
                src='/images/compass.png'
                alt='Compass Logo'
                width={24}
                height={24}
              />
              <span className='text-sm font-semibold'>Compass</span>
            </div>
            <p className='text-xs text-zinc-500'>
              © {new Date().getFullYear()} Compass. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
