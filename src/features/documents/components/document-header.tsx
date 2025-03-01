'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ImageIcon,
  MessageSquareIcon,
  UploadIcon,
  TrashIcon,
  SmileIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MotionDocument } from '../types/document';
import { useUpdateDocument } from '../hooks/useDocuments';
import { CoverImageSelector } from './cover-image-selector';

interface NotionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  document: MotionDocument;
}

export function DocumentHeader({ document, className }: NotionHeaderProps) {
  const { mutateAsync: updateDocument, isPending } = useUpdateDocument();
  const [coverImage, setCoverImage] = useState<string | null>(
    document.cover_image || null
  );
  const [icon, setIcon] = useState<string | null>(document.icon || null);
  const [isRepositioning, setIsRepositioning] = useState(false);
  const [repositionY, setRepositionY] = useState(50);
  const coverRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Common emoji sets
  const emojiSets = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '👍',
    '👎',
    '👏',
    '🙌',
    '👐',
    '🤲',
    '🤝',
    '🙏',
    '✌️',
    '🤞',
    '🔥',
    '⭐',
    '💫',
    '✨',
    '💥',
    '💢',
    '💦',
    '💧',
    '💤',
    '💨',
  ];

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const handleRemoveCover = async () => {
    setCoverImage(null);
    await updateDocument({
      id: document.id,
      cover_image: null,
    });
  };

  const handleRepositionStart = () => {
    setIsRepositioning(true);
  };

  const handleRepositionEnd = () => {
    setIsRepositioning(false);
  };

  const handleRepositionMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRepositioning && coverRef.current) {
      const rect = coverRef.current.getBoundingClientRect();
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const clampedY = Math.max(0, Math.min(100, y));
      setRepositionY(clampedY);
    }
  };

  const handleChangeIcon = async (newIcon: string | null) => {
    setIcon(newIcon);
    await updateDocument({
      id: document.id,
      icon: newIcon,
    });
  };
  const handleChangeCoverImage = async (newCoverImage: string | null) => {
    setCoverImage(newCoverImage);
    await updateDocument({
      id: document.id,
      cover_image: newCoverImage,
    });
  };

  return (
    <div className={cn('full-bleed', className)}>
      {/* Cover Image */}
      <div className='relative'>
        {coverImage ? (
          <div
            ref={coverRef}
            className='relative w-full h-[200px] overflow-hidden group/cover'
            onMouseMove={handleRepositionMove}
            onMouseUp={handleRepositionEnd}
          >
            <div
              className='absolute inset-0 w-full'
              style={{
                backgroundImage: coverImage.startsWith('linear-gradient')
                  ? coverImage
                  : coverImage.startsWith('#') ||
                    coverImage.startsWith('hsl') ||
                    coverImage.startsWith('rgb')
                  ? `linear-gradient(to bottom, ${coverImage}, ${coverImage})`
                  : `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: `center ${repositionY}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className='absolute top-2 right-2 flex gap-2 group-hover/cover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out'>
              <Popover>
                <PopoverTrigger asChild id='cover-popover-trigger'>
                  <Button variant='secondary' size='sm'>
                    <span>Change cover</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-96'>
                  <CoverImageSelector
                    handleChangeCoverImage={handleChangeCoverImage}
                    setCoverImage={setCoverImage}
                    fileInputRef={fileInputRef}
                    handleCoverImageUpload={handleCoverImageUpload}
                  />
                </PopoverContent>
              </Popover>
              <Button
                variant='secondary'
                size='sm'
                onClick={handleRepositionStart}
                onMouseUp={handleRepositionEnd}
              >
                Reposition
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Icon and Title Row */}
      <div className='px-4 py-6 flex items-center gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            {icon ? (
              <div
                className={cn(
                  'relative group transition-all duration-300 ease-in-out',
                  {
                    '-translate-y-16': coverImage,
                  }
                )}
              >
                <div className='text-7xl cursor-pointer'>{icon}</div>
                <div className='absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-5 w-5 rounded-full bg-muted'
                    onClick={() => handleChangeIcon(null)}
                  >
                    <XIcon className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant='ghost' size='sm' className='gap-1'>
                <SmileIcon className='h-4 w-4' />
                Add icon
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='space-y-4'>
              <h3 className='font-medium'>Add icon</h3>
              <div className='grid grid-cols-8 gap-2'>
                {emojiSets.map((emoji, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='h-8 w-8 p-0'
                    onClick={() => handleChangeIcon(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Action Buttons */}

      {!coverImage && (
        <div className='px-4 flex items-center gap-2 text-muted-foreground'>
          <Popover>
            <PopoverTrigger asChild id='cover-popover-trigger'>
              <Button variant='ghost' size='sm' className='gap-1'>
                <ImageIcon className='h-4 w-4' />
                Add cover
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-96'>
              <CoverImageSelector
                handleChangeCoverImage={handleChangeCoverImage}
                setCoverImage={setCoverImage}
                fileInputRef={fileInputRef}
                handleCoverImageUpload={handleCoverImageUpload}
              />
            </PopoverContent>
          </Popover>

          {coverImage && (
            <Button
              variant='ghost'
              size='sm'
              className='gap-1 ml-auto text-red-500 hover:text-red-600 hover:bg-red-50'
              onClick={handleRemoveCover}
            >
              <TrashIcon className='h-4 w-4' />
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
