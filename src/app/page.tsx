import { FlipWords } from '@/components/flip-words';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Disclamer } from './components/disclaimer';

export default async function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative size-full'>
      <Disclamer />

      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
        <ol className='list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2'>
            This is your landing page. You can edit{' '}
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              src/app/page.tsx
            </code>{' '}
            to change the content of this page.
          </li>
          <li>
            This is a Supabase app, NextJS, and Tailwind CSS template. Edit the
            following <br />
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              src/supabase/client.ts
            </code>{' '}
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              src/supabase/server.ts
            </code>{' '}
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
              src/supabase/middleware.ts
            </code>{' '}
          </li>
        </ol>
        <div className='h-[40rem] flex justify-center items-center px-4'>
          <div className='text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400'>
            <FlipWords
              words={[
                'Next.js',
                'React',
                'Tailwind CSS',
                'TypeScript',
                'Supabase',
              ]}
              className='text-2xl sm:text-4xl font-[family-name:var(--font-geist-mono)]'
            />
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        &copy; {new Date().getFullYear()} Tedane Blake
      </footer>

      <GridPattern
        width={100}
        height={100}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:radial-gradient(100dvw_circle_at_center,white,transparent)]'
        )}
      />
    </div>
  );
}
