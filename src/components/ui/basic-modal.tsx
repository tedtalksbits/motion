'use client';
import React from 'react';
import { Button } from './button';

export const BasicModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const handleModalToggle = () => {
    if (modalRef.current) {
      modalRef.current.setAttribute('aria-hidden', 'false');
      modalRef.current.classList.remove('hidden');
    }
  };

  const handleModalHide = () => {
    if (modalRef.current) {
      modalRef.current.setAttribute('aria-hidden', 'true');
      modalRef.current.classList.add('hidden');
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.setAttribute('aria-hidden', 'true');
      e.currentTarget.classList.add('hidden');
    }
  };
  return (
    <>
      <Button
        data-modal-target='default-modal'
        data-modal-toggle='default-modal'
        type='button'
        onClick={handleModalToggle}
      >
        Toggle modal
      </Button>

      <div
        ref={modalRef}
        id='default-modal'
        tabIndex={-1}
        aria-hidden='true'
        className='flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full aria-hidden:hidden bg-black/50 dark:bg-black/80'
        onClick={handleModalClick}
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
          {/* <!-- Modal content --> */}
          <div className='relative bg-card rounded-lg shadow-sm '>
            {/* <!-- Modal header --> */}
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-border'>
              <h3 className='text-xl font-semibold text-foreground'>
                Terms of Service
              </h3>
              <Button
                type='button'
                size={'icon'}
                variant={'ghost'}
                data-modal-hide='default-modal'
                onClick={handleModalHide}
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </Button>
            </div>
            {/* <!-- Modal body --> */}
            <div className='p-4 md:p-5 space-y-4'>
              <p className='text-base leading-relaxed text-foreground/80'>
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className='text-base leading-relaxed text-foreground/80'>
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className='flex items-center p-4 md:p-5 border-t border-border rounded-b'>
              <Button
                data-modal-hide='default-modal'
                type='button'
                onClick={handleModalHide}
              >
                I accept
              </Button>
              <Button
                data-modal-hide='default-modal'
                type='button'
                onClick={handleModalHide}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
