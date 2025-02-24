'use client';

import { Modal } from '@/components/ui/animated-modal';
import { Button } from '@/components/ui/button';
import React from 'react';

export const Disclamer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Button variant='secondary' onClick={() => setIsOpen(true)}>
        Disclaimer
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Custom Styled Modal'
        className='bg-blue-100 border-2 border-blue-500'
        overlayClassName='bg-black/50'
        contentClassName='text-blue-800'
      >
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Disclaimer</h1>
          <p>
            This is a demo application for educational purposes only. The
            information provided in this app is not intended as legal advice and
            should not be construed as such. The app is designed to showcase the
            capabilities of Next.js, TypeScript, and other modern web
            technologies.
          </p>
          <p>
            By using this app, you acknowledge that you have read and understood
            this disclaimer and agree to its terms.
          </p>
        </div>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};
