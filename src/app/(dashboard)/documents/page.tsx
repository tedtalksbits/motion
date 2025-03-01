'use client';
import { Editor } from '@/components/dynamic-editor';
import { Button } from '@/components/ui/button';
import { DocumentTitle } from '@/features/documents/components/document-title';
import { useCreateDocument } from '@/features/documents/hooks/useDocuments';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DocumentsPage() {
  const {
    mutateAsync: createDocument,
    isError,
    isPending,
  } = useCreateDocument();
  const router = useRouter();
  const onCreate = async () => {
    try {
      const res = await createDocument({
        title: 'Untitled',
        content: [],
      });

      if (res) {
        router.push(`/documents/${res.id}`);
      } else {
        console.error('Document creation failed');
      }
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/EmptyState.svg'
        height='500'
        width='500'
        alt='Empty'
        className='hidden dark:block'
      />
      <h2 className='text-lg font-medium'>Welcome to Motion</h2>
      <Button onClick={onCreate} disabled={isPending}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a document
      </Button>
    </div>
  );
}
