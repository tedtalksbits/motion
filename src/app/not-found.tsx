'use client';
import { CompassIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function NotFound() {
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const updateMousePosition = (ev: MouseEvent) => {
  //     setMousePosition({ x: ev.clientX, y: ev.clientY });
  //   };
  //   window.addEventListener('mousemove', updateMousePosition);
  //   return () => {
  //     window.removeEventListener('mousemove', updateMousePosition);
  //   };
  // }, []);

  // const calculateRotation = (axis: 'x' | 'y') => {
  //   const maxRotation = 15;
  //   const centerX = window.innerWidth / 2;
  //   const centerY = window.innerHeight / 2;
  //   const rotationX = ((mousePosition.y - centerY) / centerY) * maxRotation;
  //   const rotationY = ((mousePosition.x - centerX) / centerX) * maxRotation;

  //   return axis === 'x' ? rotationX : -rotationY;
  // };
  return (
    <div className='bg-background'>
      <div className='p-4'>
        <div className='w-full h-11 rounded-t-lg bg-secondary flex justify-start items-center space-x-1.5 px-3'>
          <Link href='/' className='w-3 h-3 rounded-full bg-red-400'></Link>

          <span className='w-3 h-3 rounded-full bg-yellow-400'></span>
          <span className='w-3 h-3 rounded-full bg-green-400'></span>
        </div>
        <div className='bg-accent border-t-0 w-full h-[calc(100dvh-77px)] rounded-b-lg p-6 border border-border/20'>
          <div className='flex justify-center items-center flex-col'>
            <div className='text-[100px] sm:text-[200px] font-bold mb-8 relative flex items-center justify-center'>
              <span>4</span>
              <Image
                src='/images/compass.png'
                alt='4'
                width={100}
                height={100}
                className='sm:w-[200px] sm:h-[200px] w-[100px] h-[100px]'
                // style={{
                //   transform: `perspective(500px) rotateX(${calculateRotation(
                //     'x'
                //   )}deg) rotateY(${calculateRotation('y')}deg)`,
                // }}
              />
              <span>4</span>
            </div>
            <h2 className='text-2xl mb-4'>Oops! Page not found</h2>
            <p className='text-foreground/50 mb-8'>
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className='flex justify-center items-center mt-4'>
            <Link
              href='/'
              className='text-sm text-primary/70 hover:text-primary'
            >
              Go back to the homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
