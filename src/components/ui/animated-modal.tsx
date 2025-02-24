'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  overlayClassName,
  contentClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 z-50 bg-background flex items-center justify-center p-4',
            overlayClassName
          )}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              'bg-white rounded-lg shadow-xl w-full max-w-md relative',
              className
            )}
          >
            <div className='flex justify-between items-center p-4 border-b'>
              {title && <h2 className='text-xl font-semibold'>{title}</h2>}
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 transition-colors'
                aria-label='Close modal'
              >
                <X className='h-6 w-6' />
              </button>
            </div>
            <div className={cn('p-4', contentClassName)}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
