'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Menu,
  Database,
  Users,
  Heading1,
  ListOrdered,
  Quote,
  Table2,
  Layout,
  FileText,
  CheckSquare,
  Slash,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FloationgIcons } from '@/components/floating-icons';

export default function Home() {
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
      <main className='flex-1'>
        <section className='flex items-center justify-center min-h-screen pt-16 relative'>
          {/* Background gradient */}
          <div className='absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent' />

          {/* Content */}
          <div className='container px-4 md:px-6 relative'>
            <div className='text-center max-w-3xl mx-auto mb-12'>
              <h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-6'>
                Navigate Your Ideas
                <span className='text-primary'>.</span>
              </h1>
              <p className='text-lg md:text-xl text-foreground/60 mb-8'>
                Organize notes, tasks, wikis, and databases in one place. Type{' '}
                <kbd className='px-2 py-1.5 text-xs font-semibold text-foreground/70 bg-foreground/5 border border-foreground/10 rounded-md'>
                  /
                </kbd>{' '}
                to access powerful blocks and start creating.
              </p>
              <Link
                href='/sign-up'
                className='flex flex-col sm:flex-row gap-4 justify-center'
              >
                <Button
                  size='lg'
                  className='bg-white text-black hover:bg-zinc-200 h-12 px-8'
                >
                  Get started for free
                </Button>
              </Link>
            </div>

            {/* Floating UI Elements */}
            <div className='relative h-[600px] max-w-5xl mx-auto'>
              {/* Command Menu Card */}
              <motion.div
                drag
                dragConstraints={{
                  left: -100,
                  right: 100,
                  top: -100,
                  bottom: 100,
                }}
                className='absolute left-[15%] top-[40%] w-[280px] h-[400px] bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transform -rotate-3 cursor-grab active:cursor-grabbing active:z-10'
              >
                <div className='p-4 border-b border-white/10'>
                  <div className='flex items-center gap-2'>
                    <Slash className='h-4 w-4 text-primary/50' />
                    <span className='font-semibold'>Quick Actions</span>
                  </div>
                </div>
                <div className='p-2 space-y-1'>
                  {[
                    { icon: FileText, label: 'Text' },
                    { icon: Heading1, label: 'Heading' },
                    { icon: ListOrdered, label: 'List' },
                    { icon: CheckSquare, label: 'To-do' },
                    { icon: Quote, label: 'Quote' },
                    { icon: Table2, label: 'Table' },
                    { icon: Layout, label: 'Layout' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer'
                    >
                      <item.icon className='h-4 w-4 text-foreground/60' />
                      <span className='text-sm'>{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Main card - Notes */}
              <motion.div
                drag
                dragConstraints={{
                  left: -100,
                  right: 100,
                  top: -100,
                  bottom: 100,
                }}
                initial={{ y: 0 }} //fix jumping on drag
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[500px] bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing active:z-10'
              >
                <div className='p-4 border-b border-white/10'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold'>Notes</h3>
                    <Button size='icon' variant='ghost' className='h-8 w-8'>
                      <Menu className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <div className='p-4 space-y-3'>
                  <div className='p-3 bg-white/5 rounded-lg border border-white/10'>
                    <h4 className='font-medium mb-2'>Project Brainstorm</h4>
                    <p className='text-sm text-zinc-400'>
                      Key ideas for the new feature implementation...
                    </p>
                  </div>
                  <div className='p-3 bg-white/5 rounded-lg border border-white/10'>
                    <h4 className='font-medium mb-2'>Meeting Summary</h4>
                    <p className='text-sm text-zinc-400'>
                      Action items from today's team sync...
                    </p>
                  </div>
                  <div className='p-3 bg-white/5 rounded-lg border border-white/10'>
                    <h4 className='font-medium mb-2'>Research Findings</h4>
                    <p className='text-sm text-zinc-400'>
                      Key insights from user interviews...
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Left floating card - Tasks */}
              <motion.div
                drag
                dragConstraints={{
                  left: -100,
                  right: 100,
                  top: -100,
                  bottom: 100,
                }}
                className='absolute left-[10%] top-[20%] w-[300px] h-[400px] bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transform -rotate-6 cursor-grab active:cursor-grabbing'
              >
                <div className='p-4 border-b border-white/10'>
                  <h3 className='font-semibold'>Tasks</h3>
                </div>
                <div className='p-4 space-y-3'>
                  {[
                    'Update product roadmap',
                    'Review design system',
                    'Prepare Q4 strategy',
                    'User research interviews',
                  ].map((task, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <div className='h-4 w-4 rounded-full border border-white/20' />
                      <span className='text-sm'>{task}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right floating card - Wiki */}
              <motion.div
                drag
                dragConstraints={{
                  left: -100,
                  right: 100,
                  top: -100,
                  bottom: 100,
                }}
                className='absolute right-[10%] top-[30%] w-[320px] h-[280px] bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transform rotate-3 cursor-grab active:cursor-grabbing'
              >
                <div className='p-4 border-b border-white/10'>
                  <h3 className='font-semibold'>Wiki</h3>
                </div>
                <div className='p-4 space-y-3'>
                  <div className='text-sm'>
                    <h4 className='font-medium'>Company Handbook</h4>
                    <p className='text-zinc-400'>Last updated 2 days ago</p>
                  </div>
                  <div className='text-sm'>
                    <h4 className='font-medium'>Product Documentation</h4>
                    <p className='text-zinc-400'>Last updated 1 week ago</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating icons with animations */}
              <FloationgIcons />
            </div>
          </div>

          {/* Decorative elements */}
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none' />
        </section>
      </main>
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
